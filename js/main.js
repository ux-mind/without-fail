'use strict';

// Bestsellers swiper
const bestsellerSwiper = new Swiper('.bestsellers-swiper', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 16,
  navigation: {
    nextEl: '.bestsellers-next',
    prevEl: '.bestsellers-prev',
  },
  breakpoints: {
    991: {
      slidesPerView: 3,
      spaceBetween: 29,
    },
  },
});

// Works swiper
const worksSwiperAdditional = new Swiper('.works-swiper-additional', {
  loop: true,
  loopedSlides: 3,
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: '.works-btn-next',
    prevEl: '.works-btn-prev',
  },
  breakpoints: {
    991: {
      slidesPerView: 2,
      spaceBetween: 31,
      initialSlide: 1,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 31,
    },
  },
});

const worksSwiperMain = new Swiper('.works-swiper-main', {
  loop: true,
  loopedSlides: 3,
  spaceBetween: 20,
});

worksSwiperMain.controller.control = worksSwiperAdditional;
worksSwiperAdditional.controller.control = worksSwiperMain;

// Product swiper
const productSwiper = new Swiper('.product-swiper-main', {
  spaceBetween: 20,
  loop: true,
  loopedSlides: 5,
});

const productSwiperAdditional = new Swiper('.product-swiper-additional', {
  loop: true,
  loopedSlides: 5,
  slidesPerView: 4,
  spaceBetween: 23,
  slideToClickedSlide: true,
  loop: true,
  navigation: {
    prevEl: '.product-swiper-additional-prev',
    nextEl: '.product-swiper-additional-next',
  },
});

productSwiperAdditional.controller.control = productSwiper;
productSwiper.controller.control = productSwiperAdditional;

const blocker = document.querySelector('.blocker');

function catalogModalHandler() {
  const modal = document.querySelector('#catalog-modal');
  const button = document.querySelector('#catalog-btn');

  button.addEventListener('click', () => {
    modal.classList.toggle('opened');
    blocker.classList.toggle('blocker_opened');
  });
}

function headerDropdownsHandler() {
  const buttons = document.querySelectorAll('.header-drop-btn');

  buttons.forEach((btn) => {
    const dropdown = btn.nextElementSibling;

    btn.addEventListener('click', () => {
      if (dropdown.matches('ul')) {
        dropdown.classList.toggle('opened');
      }
    });
  });
}

function toggleHeaderHeight() {
  const headerElement = document.querySelector('#header');

  window.addEventListener('scroll', () => {
    const isHeaderSmall = headerElement.classList.contains('header-small');

    if (window.scrollY > 0 && !isHeaderSmall) {
      headerElement.classList.add('header-small');
    }

    if (window.scrollY === 0 && isHeaderSmall) {
      headerElement.classList.remove('header-small');
    }
  });
}

// Footer dropdown handler
function footerDropdownHandler() {
  const footerTitlesList = document.querySelectorAll('.footer-title');

  footerTitlesList.forEach((el) => {
    el.onclick = () => {
      el.classList.toggle('footer-title_opened');
    };
  });
}

// Function for "up" button in footer
function footerScrollTop() {
  const btn = document.querySelector('.footer__top-btn');

  btn.onclick = () => {
    window.scrollTo(0, 0);
  };
}

// Function for handling catalog aside list at catalog-section page
function catalogAsideHandler() {
  const catalogAsideList = document.querySelector('.catalog-aside-list');

  if (catalogAsideList) {
    catalogAsideList.addEventListener('click', (e) => {
      const target = e.target;

      if (
        target.matches('.catalog-aside__item-drop') ||
        target.closest('.catalog-aside__item-drop')
      ) {
        const catalogAsideItem = target.closest('.catalog-aside__item');

        if (catalogAsideItem) {
          catalogAsideItem.classList.toggle('opened');
        }
      }
    });
  }
}

function handleProductInfoDrop() {
  const btn = document.querySelector('.product-content__about-more');
  let additionalInfoBlock = btn.previousSibling;

  while (additionalInfoBlock && additionalInfoBlock.nodeType != 1) {
    additionalInfoBlock = additionalInfoBlock.previousSibling;
  }

  if (
    btn &&
    additionalInfoBlock.matches('.product-content__about_additional')
  ) {
    btn.addEventListener('click', () => {
      btn.classList.toggle('opened');
      additionalInfoBlock.classList.toggle('opened');
    });
  }
}

function handleProductTable() {
  const btn = document.querySelector('.product-parameters__more');
  let additionalInfoBlock = btn.previousSibling;

  while (additionalInfoBlock && additionalInfoBlock.nodeType != 1) {
    additionalInfoBlock = additionalInfoBlock.previousSibling;
  }

  if (btn && additionalInfoBlock.matches('.product-parameters_additional')) {
    btn.addEventListener('click', () => {
      btn.classList.toggle('opened');
      additionalInfoBlock.classList.toggle('opened');
    });
  }
}

catalogModalHandler();
headerDropdownsHandler();
toggleHeaderHeight();
footerDropdownHandler();
footerScrollTop();
catalogAsideHandler();
handleProductInfoDrop();
handleProductTable();
