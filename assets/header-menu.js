// Mobile Menu Toggle Script
(function() {
  'use strict';
  
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    let menuTransitionTimeout;

    if (!mobileMenuBtn || !mobileMenu) {
      setTimeout(initMobileMenu, 100);
      return;
    }

    // Function to open the menu
    function openMobileMenu() {
      clearTimeout(menuTransitionTimeout);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
      mobileMenu.classList.remove('hidden');
      
      // Force a reflow to ensure the transition works
      mobileMenu.offsetHeight;
      
      mobileMenu.classList.add('open');
      menuOpenIcon.classList.add('hidden');
      menuCloseIcon.classList.remove('hidden');
    }

    // Function to close the menu
    function closeMobileMenu() {
      document.body.style.overflow = ''; // Restore scrolling
      mobileMenu.classList.remove('open');
      
      // Add hidden class after transition completes
      menuTransitionTimeout = setTimeout(() => {
        if (!mobileMenu.classList.contains('open')) {
          mobileMenu.classList.add('hidden');
        }
      }, 400); // Match this to the CSS transition duration
      
      menuOpenIcon.classList.remove('hidden');
      menuCloseIcon.classList.add('hidden');
    }

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = mobileMenu.classList.contains('open');
      
      if (!isOpen) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });

    // Handle close button click
    if (mobileMenuCloseBtn) {
      mobileMenuCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Wait for header component to be loaded, then initialize
  function waitForHeaderAndInit() {
    // Listen for header loaded event
    document.addEventListener('headerLoaded', function() {
      // Give DOM time to update
      setTimeout(() => {
        initMobileMenu();
      }, 100);
    });

    // Also check if header is already loaded
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder && headerPlaceholder.innerHTML.trim() !== '') {
      initMobileMenu();
    }
  }
  
  // Make closeMobileMenu available globally so it can be called from HTML
  window.closeMobileMenu = function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    
    if (mobileMenu) {
      document.body.style.overflow = '';
      mobileMenu.classList.remove('open');
      
      setTimeout(() => {
        if (!mobileMenu.classList.contains('open')) {
          mobileMenu.classList.add('hidden');
        }
      }, 400);
      
      if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.classList.remove('hidden');
        menuCloseIcon.classList.add('hidden');
      }
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      waitForHeaderAndInit();
    });
  } else {
    waitForHeaderAndInit();
  }
})();
