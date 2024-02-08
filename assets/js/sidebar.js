// Load sidebar template
const sidebarContainer = document.getElementById('sidebar');
fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        sidebarContainer.innerHTML = data;
        // Call the function to initialize toggle functionality after sidebar content is loaded
        initializeSidebarToggle();
    })
    .catch(error => console.error('Error loading sidebar template:', error));

// Function to initialize sidebar toggle functionality
function initializeSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }

    function hideSidebar() {
        sidebar.classList.remove('active');
    }

    function handleResize() {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const isActive = sidebar.classList.contains('active');
    
        if (viewportWidth >= 590) {
            if (!isActive) {
                sidebar.classList.add('active');
            }
        } else {
            if (isActive) {
                sidebar.classList.remove('active');
            }
        }
    }

    function handleScroll() {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if (viewportWidth < 590) {
            hideSidebar();
        }
    }

    // Attach event listeners
    sidebarToggle.addEventListener('click', toggleSidebar);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleResize);
}
