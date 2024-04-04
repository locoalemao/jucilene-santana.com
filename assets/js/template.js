function loadTemplate() {
    // Determine current page location (optional)
    const currentPage = window.location.pathname.split('/')[1];  // Extracts folder name
  
    // Load header based on location
    const headerContainer = document.getElementById('header');
    let headerPath = 'header.html';  // Default path (assuming in same folder)
    
    if (currentPage === 'recipes') {  // Adjust condition based on your folder name
      headerPath = '../../main/header.html';  // Path for recipe pages
    }
  
    fetch(headerPath)
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;
      })
      .catch(error => console.error('Error loading header template:', error));
  
    // Load footer (adjust path based on location)
    const footerContainer = document.getElementById('footer');
    let footerPath = 'footer.html';  // Default path (assuming in same folder)
  
    if (currentPage === 'recipes') {  // Adjust condition for recipe pages
      footerPath = '../../main/footer.html';  // Path for recipe pages in main folder
    }
  
    fetch(footerPath)
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
      })
      .catch(error => console.error('Error loading footer template:', error));
  
    // Optional: Load sidebar if applicable (adjust path if needed)
    const sidebarContainer = document.getElementById('sidebar-cont');
    if (currentPage === 'recipes') {  // Optional: Load sidebar only on recipe pages
      fetch('../../main/sidebar.html')  // Adjust path based on your location
        .then(response => response.text())
        .then(data => {
          sidebarContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading sidebar template:', error));
    }
  }
  
  // Call the function to load templates after the DOM content has loaded
  document.addEventListener('DOMContentLoaded', loadTemplate);
  