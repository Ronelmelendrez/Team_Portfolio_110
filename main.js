window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

const serviceModals = document.querySelectorAll(".service-modal");
const learnMoreBtns = document.querySelectorAll(".learn-more-btn");
const modalCloseBtns = document.querySelectorAll(".modal-close-btn");

var modal = function (modalClick) {
  serviceModals[modalClick].classList.add("active");
};

learnMoreBtns.forEach((learnMoreBtn, i) => {
  learnMoreBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloseBtns.forEach((modalCloseBtn) => {
  modalCloseBtn.addEventListener("click", () => {
    serviceModals.forEach((modalView) => {
      modalView.classList.remove("active");
    });
  });
});

const portfolioModals = document.querySelectorAll(".portfolio-model");
const imgCards = document.querySelectorAll(".img-card");
const portfolioCloseBtns = document.querySelectorAll(".portfolio-close-btn");

var portfolioModal = function (modalClick) {
  portfolioModals[modalClick].classList.add("active");
};

imgCards.forEach((imgCard, i) => {
  imgCard.addEventListener("click", () => {
    portfolioModal(i);
  });
});

portfolioCloseBtns.forEach((portfolioCloseBtn) => {
  portfolioCloseBtn.addEventListener("click", () => {
    portfolioModals.forEach((portfolioModalView) => {
      portfolioModalView.classList.remove("active");
    });
  });
});

// Team Slider Functionality
const teamSlides = document.querySelectorAll(".team-slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(n) {
  // Remove active class from all slides and dots
  teamSlides.forEach((slide) => {
    slide.classList.remove("active");
  });
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Handle wrap around
  if (n >= teamSlides.length) {
    currentSlide = 0;
  } else if (n < 0) {
    currentSlide = teamSlides.length - 1;
  } else {
    currentSlide = n;
  }

  // Add active class to current slide and dot
  teamSlides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

// Next button
nextBtn.addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

// Previous button
prevBtn.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

// Auto slide (optional - uncomment to enable)
// setInterval(() => {
//   showSlide(currentSlide + 1);
// }, 5000);

// Client Slider Functionality
const clientSlides = document.querySelectorAll(".client-slide");
const clientPrevBtn = document.querySelector(".client-prev-btn");
const clientNextBtn = document.querySelector(".client-next-btn");
const clientDots = document.querySelectorAll(".client-dot");

let currentClientSlide = 0;

function showClientSlide(n) {
  // Remove active class from all slides and dots
  clientSlides.forEach((slide) => {
    slide.classList.remove("active");
  });
  clientDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Handle wrap around
  if (n >= clientSlides.length) {
    currentClientSlide = 0;
  } else if (n < 0) {
    currentClientSlide = clientSlides.length - 1;
  } else {
    currentClientSlide = n;
  }

  // Add active class to current slide and dot
  clientSlides[currentClientSlide].classList.add("active");
  clientDots[currentClientSlide].classList.add("active");
}

// Next button
clientNextBtn.addEventListener("click", () => {
  showClientSlide(currentClientSlide + 1);
});

// Previous button
clientPrevBtn.addEventListener("click", () => {
  showClientSlide(currentClientSlide - 1);
});

// Dot navigation
clientDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showClientSlide(index);
  });
});

// Auto slide for client testimonials (optional - uncomment to enable)
// setInterval(() => {
//   showClientSlide(currentClientSlide + 1);
// }, 6000);
