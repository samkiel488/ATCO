document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
  });
  
  // Form submission
  const conversionForm = document.getElementById('conversionForm');
  const formMessage = document.getElementById('formMessage');
  
  conversionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = conversionForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    
    // Simulate form submission (in a real scenario, you would use Formspree, PHP mailer, etc.)
    setTimeout(function() {
      // Create form data object
      const formData = new FormData(conversionForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      // In a real implementation, you would send this data to your server
      console.log('Form data:', data);
      
      // Show success message
      formMessage.textContent = 'Thank you! Your booking request has been received. We will contact you shortly.';
      formMessage.classList.remove('error');
      formMessage.classList.add('success');
      formMessage.style.display = 'block';
      
      // Reset form
      conversionForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Booking';
      
      // Scroll to message
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Hide message after 5 seconds
      setTimeout(function() {
        formMessage.style.display = 'none';
      }, 5000);
      
    }, 1500);
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      mainNav.classList.remove('active');
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add current year to footer
  document.querySelector('.copyright p').innerHTML = `&copy; ${new Date().getFullYear()} Atco CNG Services. All rights reserved.`;
});