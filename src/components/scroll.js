// Modern vanilla JavaScript replacement for jQuery scroll functionality

const scroll = () => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
  } else {
    initScrollToTop();
  }
};

const initScrollToTop = () => {
  const scrollButtons = document.querySelectorAll('.back_to_top');
  
  scrollButtons.forEach(button => {
    // Initially hide the button
    button.style.display = 'none';
    button.removeAttribute('href');
    
    // Show/hide button based on scroll position
    const toggleButton = () => {
      if (window.scrollY >= 250) {
        button.style.display = 'block';
        button.style.opacity = '1';
      } else {
        button.style.opacity = '0';
        setTimeout(() => {
          if (window.scrollY < 250) {
            button.style.display = 'none';
          }
        }, 300);
      }
    };
    
    // Check initial scroll position
    toggleButton();
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleButton);
    
    // Handle click to scroll to top
    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
};

export default scroll;
