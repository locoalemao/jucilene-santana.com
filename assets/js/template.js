function loadTemplate() {
  const currentPage = window.location.pathname.split("/")[1];

  const headerContainer = document.getElementById("header");
  let headerPath = "header.html";

  if (currentPage === "recipes") {
    headerPath = "../../main/header.html";
  }

  fetch(headerPath)
    .then((response) => response.text())
    .then((data) => {
      headerContainer.innerHTML = data;
      addNavigationListeners();

      // Initialize search functionality immediately after setting the header content
      initSearchFunctionality();
    })
    .catch((error) => console.error("Error loading header template:", error));

  const footerContainer = document.getElementById("footer");
  let footerPath = "footer.html";

  if (currentPage === "recipes") {
    footerPath = "../../main/footer.html";
  }

  fetch(footerPath)
    .then((response) => response.text())
    .then((data) => {
      footerContainer.innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer template:", error));

  const sidebarContainer = document.getElementById("sidebar-cont");
  if (currentPage === "recipes") {
    fetch("../../main/sidebar.html")
      .then((response) => response.text())
      .then((data) => {
        sidebarContainer.innerHTML = data;
      })
      .catch((error) =>
        console.error("Error loading sidebar template:", error)
      );
  }
}

function addNavigationListeners() {
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetSectionId = this.getAttribute("href").split("#")[1];
      window.location.href = "../main/index.html#" + targetSectionId;
    });
  });
}

// Function to initialize search functionality
function initSearchFunctionality() {
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector("#searchInput");

  if (searchButton) {
    searchButton.addEventListener("click", function () {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        window.location.href = `../main/search.html?query=${encodeURIComponent(
          searchTerm
        )}`;
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        searchButton.click();
      }
    });
  }
}

// Function to normalize text by removing accents and converting to lowercase
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD") // Normalize to Unicode Normalization Form D (decomposition)
    .replace(/[\u0300-\u036f]/g, ""); // Remove accents
}

// Function to perform the search and display results
function performSearch() {
  const queryParams = new URLSearchParams(window.location.search);
  const searchTerm = queryParams.get("query");

  if (searchTerm) {
    const searchTitle = `Resultados de busca para "${searchTerm}"`;
    document.getElementById("search-title").innerText = searchTitle;

    loadSearchResults(searchTerm);
  }
}

// Function to load search results
function loadSearchResults(searchTerm) {
  const recipeContainer = document.getElementById("recipe-container");
  recipeContainer.innerHTML = "";

  // Normalize search term
  const normalizedSearchTerm = normalizeText(searchTerm);

  // Tokenize search term into individual words
  const searchTerms = normalizedSearchTerm
    .split(" ")
    .filter((word) => word.length > 0);

  // Filter recipes based on whether any search term is present in title or tags
  const filteredRecipes = window.recipes.filter((recipe) => {
    const normalizedTitle = normalizeText(recipe.title);
    const normalizedTags = recipe.tags.map((tag) => normalizeText(tag));

    return searchTerms.some(
      (term) =>
        normalizedTitle.includes(term) ||
        normalizedTags.some((tag) => tag.includes(term))
    );
  });

  displayRecipes(filteredRecipes);
}

// Function to display recipes
function displayRecipes(recipes) {
  const recipeContainer = document.getElementById("recipe-container");
  if (recipes.length === 0) {
    recipeContainer.innerHTML = `
    <p style="margin: 5rem 2rem 5rem 2rem; text-align: center;">
      <img src="/assets/icons/icons8-no-food-96.png" alt="Nenhum resultado encontrado" style="width: 96px; height: 96px;">
    </p>`;
    return;
  }

  const videoGrid = document.createElement("div");
  videoGrid.classList.add("video__grid");

  recipes.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("video__preview");

    recipeElement.innerHTML = `
      <div class="thumbnail__row">
        <a href="${recipe.link}" target="_blank">
          <img src="${recipe.image}" alt="${recipe.title}" class="thumbnail">
          <div>
            <h3 class="fav-recipes__title">${recipe.title}</h3>
          </div>
        </a>
      </div>
    `;

    videoGrid.appendChild(recipeElement);
  });

  recipeContainer.appendChild(videoGrid);

  // Add hover effect to the newly created elements
  const videoPreviews = document.querySelectorAll(".video__preview");

  videoPreviews.forEach((preview) => {
    const thumbnailRow = preview.querySelector(".thumbnail__row");

    preview.addEventListener("mouseenter", () => {
      thumbnailRow.style.transition = "transform 0.4s";
      thumbnailRow.style.transform = "scale(1.05) translateY(-5px)";
    });

    preview.addEventListener("mouseleave", () => {
      thumbnailRow.style.transition = "transform 0.4s";
      thumbnailRow.style.transform = "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initSearchFunctionality();
  if (window.location.pathname.includes("search.html")) {
    performSearch();
  }
});

// Call the function to load templates after the DOM content has loaded
document.addEventListener("DOMContentLoaded", loadTemplate);
