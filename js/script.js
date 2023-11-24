"use strict"

// ------------- shrinking header on scroll -------------
// Get the header element
const headerElement = document.querySelector(".header")

// Define the callback function for the IntersectionObserver
const callback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove("header--scrolled")
  } else {
    headerElement.classList.add("header--scrolled")
  }
}

// Create an IntersectionObserver instance with the callback function
const headerObserver = new IntersectionObserver(callback)

// Add error handling in case the header element is not found
if (headerElement) {
  // Observe the header element for changes
  headerObserver.observe(headerElement)
} else {
  console.error("Header element not found.")
}
// ------------- END OF shrinking header on scroll -------------

// ------------- hamburger menu -------------
const iconMenu = document.querySelector(".icon-menu")
const menuBody = document.querySelector(".menu__body")
const menuLinks = document.querySelectorAll(".menu__link")
const headerActions = document.querySelector(".header__actions")

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    toggleMenu()
  })

  //event handlers for menu items
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (iconMenu.classList.contains("_active")) {
        toggleMenu()
      }
    })
  })

  // close menu when clicking inside header__actions
  headerActions.addEventListener("click", function (e) {
    if (iconMenu.classList.contains("_active")) {
      toggleMenu()
    }
  })

  // toggle menu function
  function toggleMenu() {
    document.body.classList.toggle("body--lock")
    iconMenu.classList.toggle("_active")
    menuBody.classList.toggle("_active")
  }

  // close hamburger menu on device rotating
  window.addEventListener("orientationchange", function () {
    if (document.body.classList.contains("body--lock")) {
      document.body.classList.remove("body--lock")
    }
    if (iconMenu.classList.contains("_active")) {
      iconMenu.classList.remove("_active")
    }
    if (menuBody.classList.contains("_active")) {
      menuBody.classList.remove("_active")
    }
  })
}
// ------------- END OF hamburger menu -------------

window.addEventListener("load", function () {
  // ------------- hero SWIPER -------------
  if (document.querySelector(".hero__slider")) {
    const thumbsSlider = new Swiper(".thumbs-slider", {
      loop: true,
      spaceBetween: 30,
      slidesPerView: 3,
      watchSlidesProgress: true,
    })
    const mainSlider = new Swiper(".main-slider", {
      loop: true,
      autoplay: {
        delay: 5000,
      },
      // effect: "fade",
      spaceBetween: 10,
      navigation: {
        nextEl: ".hero__arrow-next",
        prevEl: ".hero__arrow-prev",
      },
      thumbs: {
        swiper: thumbsSlider,
      },
    })
  }

  // ------------- reviews SWIPER -------------
  if (document.querySelector(".reviews__slider")) {
    const reviewsSlider = new Swiper(".reviews__slider", {
      speed: 500,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      // Navigation arrows
      navigation: {
        nextEl: ".reviews__arrow-next",
        prevEl: ".reviews__arrow-prev",
      },
    })
  }
})

// ------------- smooth UP scroll -------------
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (e) {
    const targetElement = e.target

    if (targetElement.closest(".footer__up")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      e.preventDefault()
    }
  })
})
// ------------- END OF smooth UP scroll -------------

// ------------- smooth scroll-to-section -------------
window.addEventListener("load", windowLoad)

function windowLoad() {
  document.addEventListener("click", documentActions)
}

function documentActions(e) {
  const targetElement = e.target
  // scroll
  if (targetElement.hasAttribute("data-goto")) {
    const gotoElement = document.querySelector(`${targetElement.dataset.goto}`)
    const headerInner = document.querySelector(".header__inner")
    const headerInnerHeight = headerInner ? headerInner.offsetHeight : 0

    if (gotoElement) {
      window.scrollTo({
        top: gotoElement.offsetTop - headerInnerHeight,
        behavior: "smooth",
      })
    }
    e.preventDefault()
  }
}
// ------------- END OF smooth scroll-to-section -------------
