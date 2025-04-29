try {
    const typed = new Typed(".multiple-text", {
        strings: ["Tech Founder", "Salesforce Developer", "Electrical Engineer", "Solutions Architect"],
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

const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = 'resources/Victor Araujo - Salesforce Developer.pdf';
    link.download = 'Victor Araujo - Salesforce Developer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

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

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close-btn");
    const anchorTags = document.querySelectorAll(".portfolio-layer a");

    // Open modal when any anchor tag is clicked
    anchorTags.forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            modal.style.display = "flex";
        });
    });

    // Close modal when the close button is clicked
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

