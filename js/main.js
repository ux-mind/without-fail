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

// Catalog swiper
function initCatalogSlider() {
  const swiper = new Swiper('.catalog-swiper', {
    pagination: {
      el: '.catalog-swiper .swiper-pagination',
    },
  });
}

// Product swiper
function handleProductSlider() {
  const swiper = new Swiper('.product-swiper', {
    navigation: {
      prevEl: '.product-swiper__prev',
      nextEl: '.product-swiper__next',
    },
  });

  const thumbsWrapper = document.querySelector(
    '.product-swiper-thumbs__wrapper'
  );

  if (thumbsWrapper) {
    const children = Array.from(thumbsWrapper.children);

    thumbsWrapper.addEventListener('click', (evt) => {
      const target = evt.target;
      const thumb = target.closest('.product-swiper-thumbs__slide');

      if (thumb) {
        children.forEach((thumb) => {
          thumb.classList.remove('product-swiper-thumbs__slide_active');
        });

        const activeIndex = children.indexOf(thumb);

        thumb.classList.add('product-swiper-thumbs__slide_active');

        swiper.slideTo(activeIndex);
      }
    });

    swiper.on('slideChange', (swiper) => {
      const activeIndex = swiper.activeIndex;

      console.log(activeIndex);

      children.forEach((thumb, idx) => {
        if (idx !== activeIndex) {
          thumb.classList.remove('product-swiper-thumbs__slide_active');
        }

        if (
          idx === activeIndex &&
          !thumb.classList.contains('product-swiper-thumbs__slide_active')
        ) {
          thumb.classList.add('product-swiper-thumbs__slide_active');
        }
      });
    });
  }
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

  if (wrapperEl) {
    for (let i = 0; i < slides.length; i++) {
      const slideData = slides[i];

      if (!slideData) {
        return;
      }

      const slideEl = document.createElement('div');
      slideEl.classList.add('swiper-slide');
      slideEl.setAttribute(
        'data-swiper-autoplay',
        `${slideData.duration * 1000}`
      );

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
}

function handleHeroSliderPagination(slides) {
  const paginationWrapper = document.querySelector('.hero .swiper-pagination');

  if (paginationWrapper && paginationWrapper.children[0]) {
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
    handleHeroSliderPagination(HERO_SLIDES);
  });
}

function handleTransparentHeader() {
  document.addEventListener('scroll', (evt) => {
    const scroll =
      document.documentElement.scrollTop || document.body.scrollTop;

    const header = document.querySelector('.header');

    if (!scroll && header) {
      header.classList.remove('header_fixed_scrolled');
    }

    if (scroll && header) {
      header.classList.add('header_fixed_scrolled');
    }
  });
}

function handleAsideDropdowns() {
  const btns = document.querySelectorAll('.aside-btn');

  if (btns[0]) {
    btns.forEach((btn) => {
      btn.addEventListener('click', (evt) => {
        evt.target.classList.toggle('aside-btn_opened');
      });
    });
  }
}

function handleProductDropdowns() {
  const btns = document.querySelectorAll('.dropdowns-block__drop-btn');

  if (btns[0]) {
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('dropdowns-block__drop-btn_opened');
      });
    });
  }
}

function handleProductColors() {
  const colorInputs = document.querySelectorAll(
    '.product-colors__color input[type="radio"]'
  );
  const colorBlock = document.querySelector('.product-colors__color-value p');

  if (colorInputs[0] && colorBlock) {
    colorInputs.forEach((input) => {
      input.addEventListener('change', () => {
        if (input.checked) {
          colorBlock.innerHTML = input.value;
        }
      });
    });
  }
}

// Sliders
handleHeroSlider();
initCollectionSlider();
initCatalogSlider();
handleProductSlider();

// Help functions
handleAccordions();
handleTransparentHeader();
handleAsideDropdowns();
handleProductDropdowns();
handleProductColors();
