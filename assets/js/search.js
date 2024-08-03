document.addEventListener("DOMContentLoaded", function() {
  // Select elements
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector("#searchInput");

  // Debugging logs to check if elements are found
  console.log("Search Button:", searchButton);
  console.log("Search Input:", searchInput);

  // Check if the elements are found before adding event listeners
  if (searchButton) {
    searchButton.addEventListener("click", function() {
      const searchTerm = searchInput.value.trim();
      console.log("Search Term:", searchTerm); // Debugging log for search term
      if (searchTerm) {
        console.log("Redirecting to search.html with query:", searchTerm); // Debugging log before redirection
        window.location.href = `../main/search.html?query=${encodeURIComponent(searchTerm)}`;
      } else {
        console.warn("Empty search term"); // Debugging log for empty search term
      }
    });
  } else {
    console.error("Search button not found");
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        console.log("Enter key pressed"); // Debugging log for enter key press
        searchButton.click();
      }
    });
  } else {
    console.error("Search input not found");
  }
});
