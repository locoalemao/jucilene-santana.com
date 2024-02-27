// Function to initialize sidebar toggle functionality
function initializeSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    function toggleSidebar() {
        console.log("Toggle sidebar function called.");
        sidebar.classList.toggle('active');
    }

    function hideSidebar() {
        sidebar.classList.remove('active');
    }

    function handleResize() {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if (viewportWidth >= 590) {
            sidebar.classList.add('active');
        } else {
            hideSidebar();
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

    // Set the initial state of the sidebar
    handleResize();
}

// Load sidebar template
const sidebarContainer = document.getElementById('sidebar');
fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        sidebarContainer.innerHTML = data;
        initializeSidebarToggle(); // Re-initialize the sidebar toggle functionality after the content is loaded
    })
    .catch(error => console.error('Error loading sidebar template:', error));

