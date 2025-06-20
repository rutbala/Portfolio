document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.main-container');
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let currentPage = 0;
    const totalPages = pages.length;

    function goToPage(pageNumber, isInitialLoad = false) {
        // Translate the main container
        mainContainer.style.transform = `translateX(-${pageNumber * 100}vw)`;

        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLinks[pageNumber]) {
            navLinks[pageNumber].classList.add('active');
        }
        
        // Update current page
        currentPage = pageNumber;

        // Show/hide arrows
        prevArrow.style.display = (currentPage === 0) ? 'none' : 'block';
        nextArrow.style.display = (currentPage === totalPages - 1) ? 'none' : 'block';

        if (isInitialLoad) {
            // Initialize the tab logic
            const employmentTabs = document.querySelectorAll('.employment-tab');
            const contentPanels = document.querySelectorAll('.content-panel');

            employmentTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Get the target panel's ID from the data-target attribute
                    const targetId = tab.getAttribute('data-target');
                    const targetPanel = document.getElementById(targetId);

                    // Deactivate all tabs and panels
                    employmentTabs.forEach(t => t.classList.remove('active'));
                    contentPanels.forEach(p => p.classList.remove('active'));

                    // Activate the clicked tab and its corresponding panel
                    tab.classList.add('active');
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                    }
                });
            });
        }
    }

    // Navigation links event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = parseInt(link.getAttribute('data-slide'));
            if (currentPage !== targetPage) {
                goToPage(targetPage);
            }
        });
    });

    // Arrow event listeners
    nextArrow.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        }
    });

    prevArrow.addEventListener('click', () => {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        }
    });

    // Initialize the page slider system, flagging it as the initial load
    goToPage(0, true);
}); 