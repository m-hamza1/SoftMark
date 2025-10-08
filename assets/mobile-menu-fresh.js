/**
 * Simple Mobile Menu - Clean & Fast
 */

(function() {
  'use strict';

  console.log('🚀 Simple Mobile Menu Script Loaded');

  // Initialize when header is loaded
  function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('mobile-menu-close');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu-link');

    if (!menuToggle || !mobileMenu) {
      console.log('⏳ Waiting for menu elements...');
      setTimeout(initMobileMenu, 50);
      return;
    }

    console.log('✅ Simple mobile menu elements found!');

    // Open menu
    function openMenu() {
      console.log('📱 Opening simple mobile menu');
      mobileMenu.classList.add('active');
      menuOverlay.classList.add('active');
      document.body.classList.add('mobile-menu-open');
      menuToggle.setAttribute('aria-expanded', 'true');
    }

    // Close menu
    function closeMenu() {
      console.log('❌ Closing simple mobile menu');
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('🔘 Simple menu toggle clicked');

      if (mobileMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close button
    if (menuClose) {
      menuClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }

    // Close when clicking overlay
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function() {
        closeMenu();
      });
    }

    // Close when clicking menu links
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close menu when pressing ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    // Prevent clicks inside menu from closing it
    mobileMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    console.log('✅ Simple mobile menu initialized successfully!');
  }

  // Wait for header to load
  document.addEventListener('headerLoaded', function() {
    console.log('📌 Header loaded event received');
    setTimeout(initMobileMenu, 50);
  });

  // Also try on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }

  // Failsafe
  window.addEventListener('load', function() {
    setTimeout(initMobileMenu, 100);
  });

})();
