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
      speed: 1300,
      autoplay: {
        delay: 4000,
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
      speed: 1200,
      loop: true,
      autoplay: {
        delay: 4000,
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

// ------------- Popup windows -------------
// Define variables
const popupLinks = document.querySelectorAll(".popup-link")
const popupCloseIcon = document.querySelectorAll(".close-popup")
const lockPadding = document.querySelectorAll(".lock-padding")
const body = document.querySelector("body")
const timeout = 500

let unlock = true

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index]
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "")
      const curentPopup = document.getElementById(popupName)
      popupOpen(curentPopup)
      e.preventDefault()
    })
  }
}

if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index]
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"))
      e.preventDefault()
    })
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open")
    if (popupActive) {
      popupClose(popupActive, false)
    } else {
      bodyLock()
    }
    curentPopup.classList.add("open")
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    const videoContainers = popupActive.querySelectorAll("video")
    if (videoContainers.length > 0) {
      videoContainers.forEach((video) => {
        video.pause()
      })
    }

    const iframes = popupActive.querySelectorAll("iframe")
    iframes.forEach((iframe) => {
      const src = iframe.getAttribute("src")
      if (src.includes("youtube.com") || src.includes("player.vimeo.com")) {
        iframe.src = src
      }
    })

    popupActive.classList.remove("open")
    if (doUnlock) {
      bodyUnLock()
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px"

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index]
      el.style.paddingRight = lockPaddingValue
    }
  }
  body.style.paddingRight = lockPaddingValue
  body.classList.add("body--lock")

  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index]
        el.style.paddingRight = "0px"
      }
    }
    body.style.paddingRight = "0px"
    body.classList.remove("body--lock")
  }, timeout)

  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.code === "Escape") {
    const popupActive = document.querySelector(".popup.open")
    if (popupActive) {
      popupClose(popupActive)
    }
  }
})
;(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this
      while (node) {
        if (node.matches(css)) return node
        else node = node.parentElement
      }
      return null
    }
  }
})()
;(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector
  }
})()
// ------------- END OF Popup windows -------------
