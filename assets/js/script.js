'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



/* Filter functionality removed - now static 6-image gallery */



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// Portfolio image modal functionality
const portfolioModalContainer = document.querySelector("[data-portfolio-modal]");
const portfolioModalClose = document.querySelector("[data-portfolio-close]");
const portfolioOverlay = document.querySelector("[data-portfolio-overlay]");
const portfolioModalImg = document.querySelector("[data-portfolio-img]");
const portfolioModalTitle = document.querySelector("[data-portfolio-title]");
const projectFigures = document.querySelectorAll(".project-img");

const portfolioModalFunc = function () {
  portfolioModalContainer.classList.toggle("active");
  portfolioOverlay.classList.toggle("active");
}

portfolioModalClose.addEventListener("click", portfolioModalFunc);
portfolioOverlay.addEventListener("click", portfolioModalFunc);

projectFigures.forEach(figure => {
  figure.addEventListener("click", function () {
    const img = this.querySelector("img");
    const title = this.querySelector(".project-title").textContent;
    portfolioModalImg.src = img.src;
    portfolioModalImg.alt = img.alt;
    portfolioModalTitle.textContent = title;
    portfolioModalFunc();
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

tsParticles.load("tsparticles", {
  background: {
    color: "#020617" // dark blue instead of transparent
  },
  fpsLimit: 60,
  particles: {
    number: { value: 100 },
    color: { value: ["#00ffff", "#ff00ff", "#facc15"] },
    shape: { type: "circle" },
    opacity: { value: 0.7 },
    size: { value: { min: 1, max: 3 } },
    links: {
      enable: true,
      distance: 120,
      color: "#00ffff",
      opacity: 0.5
    },
    move: {
      enable: true,
      speed: 2,
      random: true
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 120 },
      push: { quantity: 5 }
    }
  }
});

// contact connection
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");

function showToast(message, type) {
  toast.textContent = message;
  toast.className = "toast show " + type;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = contactForm.querySelector('input[name="name"]');
  const email = contactForm.querySelector('input[name="email"]');
  const message = contactForm.querySelector('textarea[name="message"]');

  // reset errors
  [name, email, message].forEach(input => input.classList.remove("error"));

  if (!name.value || !email.value || !message.value) {
    showToast("⚠️ Please fill in all fields", "error");

    [name, email, message].forEach(input => {
      if (!input.value) input.classList.add("error");
    });

    return;
  }

  emailjs.sendForm("service_o23xqwa", "template_mb790td", contactForm)
    .then(() => {
      showToast("✅ Message sent successfully!", "success");
      contactForm.reset();
    })
    .catch((error) => {
      showToast("❌ Failed to send. Try again.", "error");
      console.error(error);
    });
});


