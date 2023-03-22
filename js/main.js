'use strict';

// Hero slider
function initSlider() {
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

function handleVideoPlay() {
  const videoSlides = document.querySelectorAll('.hero-swiper .swiper-slide');

  if (videoSlides) {
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

initSlider();
handleVideoPlay();
