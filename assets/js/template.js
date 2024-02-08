// Function to load the header and footer templates
function loadTemplate() {
    // Load header
    const headerContainer = document.getElementById('header');
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            headerContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading header template:', error));

    // Load footer
    const footerContainer = document.getElementById('footer');
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading footer template:', error));
}

// Call the function to load the templates after the DOM content has loaded
document.addEventListener('DOMContentLoaded', loadTemplate);

