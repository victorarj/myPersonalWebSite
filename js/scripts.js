try {
    const typed = new Typed(".multiple-text", {
        strings: ["Digital Innovators", "Customer-Centric", "Solutions-Driven", "AI-Oriented"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
} catch (error) {
    console.error("Error initializing Typed.js:", error);
}

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-image, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-image', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

(function(){
    emailjs.init("rZjGYCkQbegxmWqbv"); // Replace with your actual user_id
})();

// Function to handle form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect form data
  var templateParams = {
      fName: document.getElementsByName('fullName')[0].value,
      lName: document.getElementsByName('email')[0].value,
      mNumber: document.getElementsByName('mobileNumber')[0].value,
      eAddress: document.getElementsByName('emailSubject')[0].value,
      message: document.getElementsByName('message')[0].value
  };

  // Send the email using EmailJS
  emailjs.send('service_0x7wjnz', 'template_k9pckhu', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       alert('Your message has been sent successfully!');
    }, function(error) {
       console.log('FAILED...', error);
       alert('Failed to send your message. Please try again.');
    });
});

/* document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showSuccessMessage();
        } else {
            console.error('Error submitting form:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}); */

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('slide-out');
    successMessage.classList.add('slide-in');
    successMessage.value = 'Message Sent!';
    
    setTimeout(() => {
        successMessage.classList.remove('slide-in');
        successMessage.classList.add('slide-out');
        successMessage.value = 'Send Message';
    }, 3000); // Hide after 3 seconds 
}

// Uncomment the following lines if you want to enable the download button functionality
/* const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = 'resources/Victor Araujo - Salesforce Developer.pdf';
    link.download = 'Victor Araujo - Salesforce Developer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}); */

// Function to check screen size and adjust behavior
function checkScreenSize() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        console.log("Mobile view detected (<= 768px)");
        // Add specific mobile behavior here
    } else if (screenWidth <= 1200) {
        console.log("Tablet view detected (<= 1200px)");
        // Add specific tablet behavior here
    } else {
        console.log("Desktop view detected (> 1200px)");
        // Add specific desktop behavior here
    }
}

// Call the function on page load and on window resize
checkScreenSize();
window.addEventListener('resize', checkScreenSize);

  // i18n dictionary
  const I18N = {
    "en": {
      "nav.home": "Home",
      "nav.about": "About Us",
      "nav.services": "Services",
      "nav.products": "Products",
      "nav.contacts": "Contacts"
    },
    "pt-pt": {
      "nav.home": "Início",
      "nav.about": "Sobre Nós",
      "nav.services": "Serviços",
      "nav.products": "Produtos",
      "nav.contacts": "Contactos"
    },
    "pt-br": {
      "nav.home": "Início",
      "nav.about": "Sobre Nós",
      "nav.services": "Serviços",
      "nav.products": "Produtos",
      "nav.contacts": "Contatos"
    }
  };

  const langToggle = document.getElementById('lang-toggle');
  const langList   = document.getElementById('lang-list');
  const langCurrent= document.getElementById('lang-current');

  function applyLang(lang) {
    const dict = I18N[lang] || I18N['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    langCurrent.textContent = (lang === 'pt-pt') ? 'PT-PT' : (lang === 'pt-br' ? 'PT-BR' : 'EN');
    localStorage.setItem('lang', lang);
  }

  function toggleDropdown(open) {
    const shouldOpen = (open !== undefined) ? open : !langList.classList.contains('open');
    langList.classList.toggle('open', shouldOpen);
    langToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  }

  // Events
  langToggle.addEventListener('click', () => toggleDropdown());
  langList.addEventListener('click', (e) => {
    const li = e.target.closest('[data-lang]');
    if (!li) return;
    applyLang(li.getAttribute('data-lang'));
    toggleDropdown(false);
  });

  // Close on outside click / ESC
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-switcher')) toggleDropdown(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleDropdown(false);
  });

  // Init from storage (default EN)
  applyLang(localStorage.getItem('lang') || 'en');
