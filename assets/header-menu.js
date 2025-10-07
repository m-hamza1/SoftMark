// Mobile Menu Toggle Script
(function() {
  'use strict';
  
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    if (!mobileMenuBtn || !mobileMenu) {
      setTimeout(initMobileMenu, 100);
      return;
    }

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = mobileMenu.classList.contains('open');
      
      if (!isOpen) {
        // Open menu
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('open');
        menuOpenIcon.classList.add('hidden');
        menuCloseIcon.classList.remove('hidden');
      } else {
        // Close menu
        mobileMenu.classList.remove('open');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
        menuOpenIcon.classList.remove('hidden');
        menuCloseIcon.classList.add('hidden');
      }
    });

    // Handle close button click
    if (mobileMenuCloseBtn) {
      mobileMenuCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close menu
        mobileMenu.classList.remove('open');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
        menuOpenIcon.classList.remove('hidden');
        menuCloseIcon.classList.add('hidden');
      });
    }

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
        menuOpenIcon.classList.remove('hidden');
        menuCloseIcon.classList.add('hidden');
      });
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

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      waitForHeaderAndInit();
    });
  } else {
    waitForHeaderAndInit();
  }
})();
