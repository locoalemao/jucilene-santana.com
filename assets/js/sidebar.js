document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebar-toggle');

    // Load the sidebar content from sidebar.html
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-cont').innerHTML = data;
            // Now that the sidebar is loaded, we can correctly toggle the 'active' class
            sidebarToggle.addEventListener('click', function() {
                const sidebar = document.querySelector('.sidebar'); // Ensure this selector matches your sidebar's class
                sidebar.classList.toggle('active');
                // Also toggle a class on the sidebar-toggle button
                sidebarToggle.classList.toggle('toggle-active'); // Use a different class name to avoid conflicts
            });
        })
        .catch(error => console.error('Error loading sidebar:', error));

    // Function to handle the sidebar visibility based on window width
    function handleWindowResize() {
        const sidebar = document.querySelector('.sidebar'); // Ensure this selector matches your sidebar's class
        if (window.innerWidth >= 590) {
            sidebar.classList.add('active');
            sidebarToggle.style.display = 'none';
        } else {
            sidebar.classList.remove('active');
            sidebarToggle.style.display = 'block';
        }
    }

    // Function to hide the sidebar when scrolling on small screens
    function handleWindowScroll() {
        const sidebar = document.querySelector('.sidebar'); // Ensure this selector matches your sidebar's class
        if (window.innerWidth < 590) {
            sidebar.classList.remove('active');
            sidebarToggle.classList.remove('toggle-active'); // Ensure the toggle button moves back with the sidebar
        }
    }

    // Attach resize and scroll event listeners
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleWindowScroll);

    // Initial call to set the correct sidebar state
    handleWindowResize();
});