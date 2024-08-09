document.addEventListener("DOMContentLoaded", function () {
  const recipes = window.recipes;
  const currentRecipeLink = window.location.pathname;

  const currentRecipe = recipes.find((recipe) =>
    recipe.link.includes(currentRecipeLink)
  );
  const sublineContainer = document.querySelector(".meta_container");
  const baseUrl = "../main/category.html?category=";

  if (currentRecipe && sublineContainer) {
    sublineContainer.innerHTML =
      '<span class="published">28 Agosto 2024</span> | ';
    currentRecipe.category.forEach((category, index) => {
      const categoryLink = document.createElement("a");
      categoryLink.href = `${baseUrl}${category}`;
      categoryLink.rel = "category tag";
      categoryLink.textContent = category;

      if (index > 0) {
        sublineContainer.innerHTML += " | ";
      }
      sublineContainer.appendChild(categoryLink);
    });
  }
});
