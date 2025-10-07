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
      
      const isHidden = mobileMenu.classList.contains('hidden');
      
      if (isHidden) {
        // Open menu with smooth animation
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.removeProperty('display');
        // Force reflow
        mobileMenu.offsetHeight;
        // Trigger animation
        requestAnimationFrame(() => {
          mobileMenu.style.maxHeight = '100vh';
          mobileMenu.style.opacity = '1';
          mobileMenu.style.transform = 'translateY(0)';
        });
        menuOpenIcon.classList.add('hidden');
        menuCloseIcon.classList.remove('hidden');
      } else {
        // Close menu with smooth animation
        mobileMenu.style.maxHeight = '0';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.display = 'none';
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
        
        // Close menu with smooth animation
        mobileMenu.style.maxHeight = '0';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.display = 'none';
        }, 300);
        menuOpenIcon.classList.remove('hidden');
        menuCloseIcon.classList.add('hidden');
      });
    }

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.style.maxHeight = '0';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.display = 'none';
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
