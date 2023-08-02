'use strict';


// * ============================================
// !                PRELOAD
// * ============================================


// ? Loading will end after document is loaded
const preloader = document.querySelector('[data-preload]'),
    circleAnimation = document.getElementsByClassName('circle');

window.addEventListener('load', () => {
    preloader.classList.add('loaded');
    document.body.classList.add('loaded');
});


// * ============================================
// ! ADD EVENT LISTENER ON MULTIPLE ELEMENTS
// * ============================================

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}


// * ============================================
// !                NAVBAR
// * ============================================


const navbar = document.querySelector('[data-navbar]'),
    navTogglers = document.querySelectorAll('[data-nav-toggler]'),
    overlay = document.querySelector('[data-overlay]');

const toggleNavbar = () => {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('nav-active');
}

addEventOnElements(navTogglers, 'click', toggleNavbar);


// * ============================================
// !        HEADER & BACK TOP BUTTON
// * ============================================


const header = document.querySelector('[data-header]'),
    backTopBtn = document.querySelector('[data-back-top-btn]');

let lastScrollPos = 0;
const hideHeader = () => {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    lastScrollPos = window.scrollY;
}
window.addEventListener('scroll', () => {
    if (this.window.scrollY >= 50) {
        backTopBtn.classList.add('active');
        header.classList.add('active');
        hideHeader();
    } else {
        backTopBtn.classList.remove('active');
        header.classList.remove('active');
    }
});


// * ============================================
// !            HERO SLIDER
// * ============================================


const heroSlider = document.querySelector('[data-hero-slider]'),
    heroSliderItems = document.querySelectorAll('[data-hero-slider-item]'),
    heroSliderPrevBtn = document.querySelector('[data-prev-btn]'),
    heroSliderNextBtn = document.querySelector('[data-next-btn]');

let currentSliderPos = 0, lastActiveSliderItem = heroSliderItems[0];
const updateSliderPos = () => {
    lastActiveSliderItem.classList.remove('active');
    heroSliderItems[currentSliderPos].classList.add('active');
    lastActiveSliderItem = heroSliderItems[currentSliderPos];
}

const slideNext = () => {
    if (currentSliderPos >= heroSliderItems.length - 1) {
        currentSliderPos = 0;
    } else {
        currentSliderPos++;
    }
    updateSliderPos();
}
heroSliderNextBtn.addEventListener('click', slideNext);
const slidePrev = () => {
    if (currentSliderPos <= 0) {
        currentSliderPos = heroSliderItems.length - 1;
    } else {
        currentSliderPos--;
    }
    updateSliderPos();
}
heroSliderPrevBtn.addEventListener('click', slidePrev);

// * ============================================
// !                AUTO SLIDE
// * ============================================

let autoSlideInterval;
const autoSlide = () => {
    autoSlideInterval = setInterval(() => {
        slideNext();
    }, 7000);
}
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseover', () => {
    clearInterval(autoSlideInterval);
});
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseout', autoSlide);

window.addEventListener('load', autoSlide);


// * ============================================
// !                PARALLAX
// * ============================================

const parallaxItems = document.querySelectorAll('[data-parallax-item]');
let x, y;
window.addEventListener('mousemove', (event) => {
    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;
    // reverse the number eg 20 -> -20, -5 -> 5
    x = x - (x * 2);
    y = y - (y * 2);
    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`
    }
});