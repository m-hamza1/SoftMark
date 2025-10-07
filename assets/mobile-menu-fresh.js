/**
 * Fresh Mobile Menu - Simple & Clean Implementation
 */

(function() {
  'use strict';
  
  console.log('🚀 Fresh Mobile Menu Script Loaded');
  
  // Initialize when header is loaded
  function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('mobile-menu-close');
    const menuLinks = document.querySelectorAll('.mobile-menu-item');
    
    if (!menuToggle || !mobileMenu) {
      console.log('⏳ Waiting for menu elements...');
      setTimeout(initMobileMenu, 100);
      return;
    }
    
    console.log('✅ Mobile menu elements found!');
    
    // Create overlay if it doesn't exist
    let overlay = document.getElementById('mobile-menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'mobile-menu-overlay';
      overlay.className = 'mobile-menu-overlay';
      document.body.appendChild(overlay);
    }
    
    // Open menu
    function openMenu() {
      console.log('📱 Opening mobile menu');
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('mobile-menu-open');
    }
    
    // Close menu
    function closeMenu() {
      console.log('❌ Closing mobile menu');
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
    }
    
    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('🔘 Menu toggle clicked');
      
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
    
    // Close when clicking menu links
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
    
    // Close when clicking overlay
    overlay.addEventListener('click', function() {
      closeMenu();
    });
    
    console.log('✅ Mobile menu initialized successfully!');
  }
  
  // Wait for header to load
  document.addEventListener('headerLoaded', function() {
    console.log('📌 Header loaded event received');
    setTimeout(initMobileMenu, 100);
  });
  
  // Also try on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
  
  // Failsafe
  window.addEventListener('load', function() {
    setTimeout(initMobileMenu, 200);
  });
  
})();
