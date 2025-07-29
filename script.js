document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle (same as before)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
  });

  // Form submission to WhatsApp
  const conversionForm = document.getElementById('conversionForm');
  const formMessage = document.getElementById('formMessage');
  
  conversionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = conversionForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    
    // Collect form data
    const formData = new FormData(conversionForm);
    const data = Object.fromEntries(formData.entries());
    
    // Get price based on engine type
    let price = '';
    switch(data.engineType) {
      case 'V4': price = '$950'; break;
      case 'V6': price = '$1200'; break;
      case 'V8': price = '$1450'; break;
      default: price = 'Price TBD';
    }
    
    // Format WhatsApp message
    const whatsappMessage = `New CNG Conversion Booking:
    
Name: ${data.fullName}
Phone: ${data.phone}
Vehicle: ${data.vehicleType}
Engine: ${data.engineType} (${price})
Preferred Date: ${data.preferredDate}
Address: ${data.address}
Notes: ${data.notes || 'None'}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/13153678185?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    formMessage.textContent = 'Thank you! You are being redirected to WhatsApp to complete your booking.';
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
  });

  // Smooth scrolling for anchor links (same as before)
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

  // Set current year in footer (same as before)
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});


