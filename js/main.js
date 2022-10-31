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

const worksSwiperAdditional = new Swiper('.works-swiper-additional', {
  loop: true,
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
  spaceBetween: 20,
});

worksSwiperMain.controller.control = worksSwiperAdditional;
worksSwiperAdditional.controller.control = worksSwiperMain;

const blocker = document.querySelector('#blocker');

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

catalogModalHandler();
headerDropdownsHandler();
toggleHeaderHeight();
footerDropdownHandler();
footerScrollTop();
