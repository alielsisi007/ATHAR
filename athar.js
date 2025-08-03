// Home slider logic
document.addEventListener("DOMContentLoaded", function () {
  // Select all slides and buttons
  const slides = document.querySelectorAll(".homeSlider .slide");
  const btns = document.querySelectorAll(".homeSlider .btnCont .btn");
  let current = 0;
  let timer;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      if (i === idx) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
    btns.forEach((btn, i) => {
      if (i === idx) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    current = idx;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 3000);
  }

  // Button click events
  btns.forEach((btn, idx) => {
    btn.addEventListener("click", function () {
      showSlide(idx);
      startTimer();
    });
  });

  // Initialize
  showSlide(0);
  startTimer();
});
////////// Home slider logic end  ////////////

////////// Projects slider logic start ////////////
document.addEventListener("DOMContentLoaded", function () {
  const projectsTrack = document.querySelector(".projects-track");
  const projectImgs = projectsTrack
    ? projectsTrack.querySelectorAll("img")
    : [];
  const slider = projectsTrack
    ? projectsTrack.closest(".slider-projects")
    : null;
  const prevBtn = slider ? slider.querySelector(".slider-btn.prev") : null;
  const nextBtn = slider ? slider.querySelector(".slider-btn.next") : null;
  let currentProject = 0;
  let isAnimating = false;

  function showProject(idx, direction = 0) {
    if (!projectImgs.length) return;
    if (isAnimating) return;
    isAnimating = true;
    projectImgs.forEach((img, i) => {
      img.classList.remove("active", "slide-left", "slide-right");
      img.style.transition = "";
      img.style.zIndex = "1";
    });
    const prevIdx = currentProject;
    const nextIdx = idx;
    if (direction === -1) {
      // Prev: animate current to right, next to center
      projectImgs[prevIdx].classList.add("slide-right");
      projectImgs[nextIdx].classList.add("active");
      projectImgs[nextIdx].style.zIndex = "2";
    } else if (direction === 1) {
      // Next: animate current to left, next to center
      projectImgs[prevIdx].classList.add("slide-left");
      projectImgs[nextIdx].classList.add("active");
      projectImgs[nextIdx].style.zIndex = "2";
    } else {
      // Initial
      projectImgs[nextIdx].classList.add("active");
      projectImgs[nextIdx].style.zIndex = "2";
    }
    setTimeout(() => {
      projectImgs.forEach((img, i) => {
        if (i !== nextIdx) {
          img.classList.remove("active", "slide-left", "slide-right");
        }
      });
      isAnimating = false;
    }, 500);
    currentProject = nextIdx;
  }

  if (prevBtn && nextBtn && projectImgs.length) {
    prevBtn.addEventListener("click", function () {
      let prev = (currentProject - 1 + projectImgs.length) % projectImgs.length;
      showProject(prev, -1);
    });
    nextBtn.addEventListener("click", function () {
      let next = (currentProject + 1) % projectImgs.length;
      showProject(next, 1);
    });
    // Initialize
    showProject(0);
  }
});
////////// Projects slider logic end  ////////////

///////// Logo slider logic start //////////
document.addEventListener("DOMContentLoaded", () => {
  const sliderLogos = document.querySelector(".sliderLogos");
  const logoCont = sliderLogos ? sliderLogos.querySelector(".logoCont") : null;
  const logoImgs = logoCont ? logoCont.querySelectorAll("img") : [];
  const prevBtn = sliderLogos
    ? sliderLogos.querySelector(".btnCont-logos .left")
    : null;
  const nextBtn = sliderLogos
    ? sliderLogos.querySelector(".btnCont-logos .right")
    : null;

  let isAnimating = false;

  function rotateLogos(direction) {
    if (isAnimating || !logoCont || logoImgs.length === 0) return;

    isAnimating = true;

    if (direction === "prev") {
      // Move last logo to the beginning
      const lastLogo = logoCont.querySelector("img:last-child");
      if (lastLogo) {
        logoCont.insertBefore(lastLogo, logoCont.firstChild);
      }
    } else if (direction === "next") {
      // Move first logo to the end
      const firstLogo = logoCont.querySelector("img");
      if (firstLogo) {
        logoCont.appendChild(firstLogo);
      }
    }

    // Reset animation flag after a short delay
    setTimeout(() => {
      isAnimating = false;
    }, 300);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      rotateLogos("prev");
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      rotateLogos("next");
    });
  }

  // Auto-rotate Logos slider every 4 seconds
  let logosTimer;

  function startLogosTimer() {
    clearInterval(logosTimer);
    logosTimer = setInterval(() => {
      rotateLogos("prev");
    }, 2000);
  }

  // Start auto-rotation
  startLogosTimer();

  // Pause auto-rotation on hover
  if (logoCont) {
    logoCont.addEventListener("mouseenter", () => {
      clearInterval(logosTimer);
    });

    logoCont.addEventListener("mouseleave", () => {
      startLogosTimer();
    });
  }
});
///////// Logo slider logic end //////////

///////// Brand slider logic start //////////
document.addEventListener("DOMContentLoaded", () => {
  const sliderBrandes = document.querySelector(".sliderBrandes");
  const brandesCont = sliderBrandes
    ? sliderBrandes.querySelector(".brandesCont")
    : null;
  const brandImgs = brandesCont ? brandesCont.querySelectorAll("img") : [];
  const prevBrandBtn = sliderBrandes
    ? sliderBrandes.querySelector(".btnCont-brands .left")
    : null;
  const nextBrandBtn = sliderBrandes
    ? sliderBrandes.querySelector(".btnCont-brands .right")
    : null;

  let isAnimatingBrands = false;

  function updateActiveClass() {
    // Get the current first image (the new first image after rotation)
    const newFirstImage = brandesCont.querySelector("img:first-child");

    // Remove active class from all images
    brandImgs.forEach((img) => {
      img.classList.remove("active");
    });

    // Add active class to the new first image (brandesCont[0])
    if (newFirstImage) {
      newFirstImage.classList.add("active");
    }
  }

  function rotateBrands(direction) {
    if (isAnimatingBrands || !brandesCont || brandImgs.length === 0) return;

    isAnimatingBrands = true;

    if (direction === "prev") {
      // Move last brand to the beginning
      const lastBrand = brandesCont.querySelector("img:last-child");
      if (lastBrand) {
        brandesCont.insertBefore(lastBrand, brandesCont.firstChild);
      }
    } else if (direction === "next") {
      // Move first brand to the end
      const firstBrand = brandesCont.querySelector("img");
      if (firstBrand) {
        brandesCont.appendChild(firstBrand);
      }
    }

    // Update active class on the new first image
    updateActiveClass();

    // Reset animation flag after a short delay
    setTimeout(() => {
      isAnimatingBrands = false;
    }, 300);
  }

  if (prevBrandBtn) {
    prevBrandBtn.addEventListener("click", () => {
      rotateBrands("prev");
    });
  }

  if (nextBrandBtn) {
    nextBrandBtn.addEventListener("click", () => {
      rotateBrands("next");
    });
  }

  // Initialize active class on the first image
  updateActiveClass();

  // Auto-rotate Brandes slider every 4 seconds
  let brandesTimer;

  function startBrandesTimer() {
    clearInterval(brandesTimer);
    brandesTimer = setInterval(() => {
      rotateBrands("prev");
    }, 2000);
  }

  // Start auto-rotation
  startBrandesTimer();

  // Pause auto-rotation on hover
  if (brandesCont) {
    brandesCont.addEventListener("mouseenter", () => {
      clearInterval(brandesTimer);
    });

    brandesCont.addEventListener("mouseleave", () => {
      startBrandesTimer();
    });
  }
});
///////// Brand slider logic end //////////

///////// OutDoor slider logic start //////////
document.addEventListener("DOMContentLoaded", () => {
  const sliderOutDoor = document.querySelector(".sliderOutDoor");
  const outDoorCont = sliderOutDoor
    ? sliderOutDoor.querySelector(".outDoorCont")
    : null;
  const outDoorImgs = outDoorCont ? outDoorCont.querySelectorAll("img") : [];
  const prevOutDoorBtn = sliderOutDoor
    ? sliderOutDoor.querySelector(".btnCont-outDoor .left")
    : null;
  const nextOutDoorBtn = sliderOutDoor
    ? sliderOutDoor.querySelector(".btnCont-outDoor .right")
    : null;

  let isAnimatingOutDoor = false;

  function updateOutDoorActiveClass() {
    // Get the current first image (the new first image after rotation)
    const newFirstImage = outDoorCont.querySelector("img:first-child");

    // Remove active class from all images
    outDoorImgs.forEach((img) => {
      img.classList.remove("active");
    });

    // Add active class to the new first image
    if (newFirstImage) {
      newFirstImage.classList.add("active");
    }
  }

  function rotateOutDoor(direction) {
    if (isAnimatingOutDoor || !outDoorCont || outDoorImgs.length === 0) return;

    isAnimatingOutDoor = true;

    if (direction === "prev") {
      // Move last image to the beginning
      const lastOutDoor = outDoorCont.querySelector("img:last-child");
      if (lastOutDoor) {
        outDoorCont.insertBefore(lastOutDoor, outDoorCont.firstChild);
      }
    } else if (direction === "next") {
      // Move first image to the end
      const firstOutDoor = outDoorCont.querySelector("img");
      if (firstOutDoor) {
        outDoorCont.appendChild(firstOutDoor);
      }
    }

    // Update active class on the new first image
    updateOutDoorActiveClass();

    // Reset animation flag after a short delay
    setTimeout(() => {
      isAnimatingOutDoor = false;
    }, 300);
  }

  if (prevOutDoorBtn) {
    prevOutDoorBtn.addEventListener("click", () => {
      rotateOutDoor("prev");
    });
  }

  if (nextOutDoorBtn) {
    nextOutDoorBtn.addEventListener("click", () => {
      rotateOutDoor("next");
    });
  }

  // Initialize active class on the first image
  if (outDoorCont) {
    updateOutDoorActiveClass();
  }

  // Auto-rotate OutDoor slider every 4 seconds
  let outDoorTimer;

  function startOutDoorTimer() {
    clearInterval(outDoorTimer);
    outDoorTimer = setInterval(() => {
      rotateOutDoor("prev");
    }, 2000);
  }

  // Start auto-rotation
  startOutDoorTimer();

  // Pause auto-rotation on hover
  if (outDoorCont) {
    outDoorCont.addEventListener("mouseenter", () => {
      clearInterval(outDoorTimer);
    });

    outDoorCont.addEventListener("mouseleave", () => {
      startOutDoorTimer();
    });
  }
});
///////// OutDoor slider logic end //////////

// Mobile Navigation Logic
document.addEventListener("DOMContentLoaded", function () {
  const navBtn = document.querySelector(".navBtn");
  const mobileNav = document.querySelector(".navMob");

  if (navBtn && mobileNav) {
    navBtn.addEventListener("click", function () {
      mobileNav.classList.toggle("show");
    });

    // Close mobile nav when clicking on a link
    const mobileNavLinks = mobileNav.querySelectorAll("a");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("show");
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener("click", function (event) {
      if (!navBtn.contains(event.target) && !mobileNav.contains(event.target)) {
        mobileNav.classList.remove("show");
      }
    });
  }
});

// Touch Support for Sliders
document.addEventListener("DOMContentLoaded", function () {
  // Add touch support for logo slider
  const logoCont = document.querySelector(".sliderLogos .logoCont");
  if (logoCont) {
    let startX = 0;
    let endX = 0;

    logoCont.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    });

    logoCont.addEventListener("touchend", function (e) {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next
          const nextBtn = document.querySelector(
            ".sliderLogos .btnCont-logos .right"
          );
          if (nextBtn) nextBtn.click();
        } else {
          // Swipe right - prev
          const prevBtn = document.querySelector(
            ".sliderLogos .btnCont-logos .left"
          );
          if (prevBtn) prevBtn.click();
        }
      }
    }
  }

  // Add touch support for brand slider
  const brandesCont = document.querySelector(".sliderBrandes .brandesCont");
  if (brandesCont) {
    let startX = 0;
    let endX = 0;

    brandesCont.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    });

    brandesCont.addEventListener("touchend", function (e) {
      endX = e.changedTouches[0].clientX;
      handleBrandSwipe();
    });

    function handleBrandSwipe() {
      const swipeThreshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next
          const nextBtn = document.querySelector(
            ".sliderBrandes .btnCont-brands .right"
          );
          if (nextBtn) nextBtn.click();
        } else {
          // Swipe right - prev
          const prevBtn = document.querySelector(
            ".sliderBrandes .btnCont-brands .left"
          );
          if (prevBtn) prevBtn.click();
        }
      }
    }
  }

  // Add touch support for OutDoor slider
  const outDoorContTouch = document.querySelector(
    ".sliderOutDoor .outDoorCont"
  );
  if (outDoorContTouch) {
    let startX = 0;
    let endX = 0;

    outDoorContTouch.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    });

    outDoorContTouch.addEventListener("touchend", function (e) {
      endX = e.changedTouches[0].clientX;
      handleOutDoorSwipe();
    });

    function handleOutDoorSwipe() {
      const swipeThreshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next
          const nextBtn = document.querySelector(
            ".sliderOutDoor .btnCont-outDoor .right"
          );
          if (nextBtn) nextBtn.click();
        } else {
          // Swipe right - prev
          const prevBtn = document.querySelector(
            ".sliderOutDoor .btnCont-outDoor .left"
          );
          if (prevBtn) prevBtn.click();
        }
      }
    }
  }
});

// Smooth Scrolling for Navigation Links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("a[href^='#']");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// Responsive Image Loading
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    img.addEventListener("error", function () {
      this.style.opacity = "0.5";
      console.warn("Failed to load image:", this.src);
    });
  });
});

// Performance Optimization for Mobile
document.addEventListener("DOMContentLoaded", function () {
  // Reduce animations on mobile for better performance
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Reduce transition times on mobile
    const style = document.createElement("style");
    style.textContent = `
      * {
        transition-duration: 0.2s !important;
      }
      .homeSlider .slide {
        transition-duration: 0.3s !important;
      }
    `;
    document.head.appendChild(style);
  }
});
