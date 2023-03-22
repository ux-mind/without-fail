'use strict';

// Hero slider
function initHeroSlider() {
  const swiper = new Swiper('.hero-swiper', {
    loop: true,

    // If we need pagination
    pagination: {
      el: '.hero-swiper .swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.hero-swiper .btn-next',
      prevEl: '.hero-swiper .btn-prev',
    },

    autoplay: {
      delay: 5000,
    },
  });
}

// Collection swiper
function initCollectionSlider() {
  const swiper = new Swiper('.collection-swiper', {
    slidesPerView: 3,
    spaceBetween: 28,

    // Navigation arrows
    navigation: {
      nextEl: '.collection-swiper__next',
      prevEl: '.collection-swiper__prev',
    },
  });
}

// Hero video play
function handleVideoPlay() {
  const videoSlides = document.querySelectorAll('.hero-swiper .swiper-slide');

  if (videoSlides[0]) {
    const videos = Array.from(videoSlides).map((slide) =>
      slide.querySelector('.hero__video')
    );

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        const video = mutation.target.children[0];

        if (video.matches('video')) {
          video.currentTime = 0;
          video.play();
        }
      });
    });

    videoSlides.forEach((slide) => {
      observer.observe(slide, { attributes: true });
    });
  }
}

function handleAccordions() {
  const accordions = document.querySelectorAll('.accordion');

  if (accordions[0]) {
    accordions.forEach((acc) => {
      const items = acc.querySelectorAll('.accordion__item');

      if (items[0]) {
        items.forEach((item) => {
          item.addEventListener('mouseenter', (evt) => {
            items.forEach((item) =>
              item.classList.remove('accordion__item_big')
            );

            evt.target.classList.add('accordion__item_big');
          });
        });
      }
    });
  }
}

// Sliders
initHeroSlider();
initCollectionSlider();

// Help functions
handleVideoPlay();
handleAccordions();
