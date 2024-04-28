function loadTemplate() {
    // Determine current page location (optional)
    const currentPage = window.location.pathname.split('/')[1];  // Extracts folder name
  
    // Load header based on location
    const headerContainer = document.getElementById('header');
    let headerPath = 'header.html';
    
    if (currentPage === 'recipes') {
      headerPath = '../../main/header.html';
    }
  
    fetch(headerPath)
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;
      })
      .catch(error => console.error('Error loading header template:', error));
  
    // Load footer (adjust path based on location)
    const footerContainer = document.getElementById('footer');
    let footerPath = 'footer.html';
  
    if (currentPage === 'recipes') {
      footerPath = '../../main/footer.html';
    }
  
    fetch(footerPath)
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
      })
      .catch(error => console.error('Error loading footer template:', error));
  
    // Optional: Load sidebar if applicable (adjust path if needed)
    const sidebarContainer = document.getElementById('sidebar-cont');
    if (currentPage === 'recipes') {
      fetch('../../main/sidebar.html')
        .then(response => response.text())
        .then(data => {
          sidebarContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading sidebar template:', error));
    }
  }
  
  // Call the function to load templates after the DOM content has loaded
  document.addEventListener('DOMContentLoaded', loadTemplate);
  