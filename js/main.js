'use strict';

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

function createHeroSlides(slides) {
  const wrapperEl = document.querySelector('.hero .swiper-wrapper');

  for (let i = 0; i < slides.length; i++) {
    const slideData = slides[i];

    if (!slideData) {
      return;
    }

    const slideEl = document.createElement('div');
    slideEl.classList.add('swiper-slide');

    if (slideData.type === 'video') {
      const slideInner = `
					<video class="hero__video" loop="loop" preload="true" muted="muted" playsinline="playinline">
						<source src="${slideData.link}" type="video/mp4">
					</video>
				`;

      slideEl.innerHTML = slideInner;
    }

    if (slideData.type === 'image') {
      const slideInner = `
					<img class="hero__img" src="${slideData.link.x1}" ${
        slideData.link.x2
          ? `srcset="${slideData.link.x1} 1x, ${slideData.link.x2} 2x"`
          : ''
      } alt="hero image" />
					<div class="dark-layer"></div>
				`;

      slideEl.innerHTML = slideInner;
    }

    wrapperEl.append(slideEl);
  }
}

function handleHeroSliderPagination(slides) {
  const paginationWrapper = document.querySelector('.hero .swiper-pagination');

  if (paginationWrapper.children[0]) {
    const bullets = Array.from(paginationWrapper.children);

    for (let i = 0; i < slides.length; i++) {
      const currentSlide = slides[i];
      const currentBullet = bullets[i];

      const slideDuration = currentSlide.duration;

      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          const bullet = mutation.target;

          if (bullet.matches('.swiper-pagination-bullet-active')) {
            bullet.innerHTML = `<span class="bullet-bar" style="animation: pagination ${slideDuration}s linear forwards"></span>`;
          } else if (bullet.matches('.swiper-pagination-bullet')) {
            bullet.innerHTML = '';
          }
        });
      });

      observer.observe(currentBullet, { attributes: true });

      bullets[
        i
      ].innerHTML = `<span class="bullet-bar" style="animation: pagination ${slideDuration}s linear forwards"></span>`;
    }
  }
}

function handleHeroSlider() {
  const HERO_SLIDES = [
    { type: 'video', link: './assets/videos/banner.mov', duration: 10 },
    {
      type: 'image',
      link: {
        x1: './assets/images/hero-image.png',
        x2: './assets/images/hero-image@2x.png',
      },
      duration: 5,
    },
    { type: 'video', link: './assets/videos/banner.mov', duration: 10 },
  ];

  window.addEventListener('load', () => {
    createHeroSlides(HERO_SLIDES);

    const swiper = new Swiper('.hero-swiper', {
      loop: true,
      speed: 1100,

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
        disableOnInteraction: false,
      },
    });

    handleVideoPlay();

    function handleSlidesDuration(swiper) {
      const activeIndex = swiper.activeIndex;
      const currentSlideData = HERO_SLIDES[activeIndex];
      const duration = currentSlideData.duration;

      if (duration) {
        swiper.autoplay.stop();

        const slideDuration = duration * 1000 - 5000;

        setTimeout(() => {
          swiper.autoplay.start();
        }, slideDuration);
      }
    }

    swiper.on('update', function (swiper) {
      handleSlidesDuration(swiper);
    });
    swiper.on('slideChange', function (swiper) {
      handleSlidesDuration(swiper);
    });

    handleHeroSliderPagination(HERO_SLIDES);
  });
}

// Sliders
// initHeroSlider();
handleHeroSlider();
initCollectionSlider();

// Help functions
// handleVideoPlay();
handleAccordions();
