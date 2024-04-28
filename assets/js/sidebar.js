document.addEventListener('DOMContentLoaded', async () => { // Use async if supported
    const sidebarToggle = document.getElementById('sidebar-toggle');
  
    try {
      // Load the sidebar content from sidebar.html using async/await (if supported)
      if (typeof window.fetch !== 'undefined') {
        const response = await fetch('../main/sidebar.html');
        const data = await response.text();
        document.getElementById('sidebar-cont').innerHTML = data;
      } else {
        console.error('Fetch API not supported. Sidebar content loading might not work as expected.');
      }

      sidebarToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('toggle-active');
      });
    } catch (error) {
      console.error('Error loading sidebar:', error);
    }
  
    // **Function to handle the sidebar visibility based on window width**
    function handleWindowResize() {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        if (window.innerWidth >= 590) {
          sidebar.classList.add('active');
          sidebarToggle.style.display = 'none';
        } else {
          sidebar.classList.remove('active');
          sidebarToggle.style.display = 'block';
        }
      }
    }
  
    // Function to hide the sidebar when scrolling on small screens
    function handleWindowScroll() {
      const sidebar = document.querySelector('.sidebar');
      if (window.innerWidth < 590) {
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('toggle-active');
      }
    }
  
    // Call handleWindowResize initially to set the correct sidebar state
    handleWindowResize();
  
    // Attach resize and scroll event listeners
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleWindowScroll);
  });
  