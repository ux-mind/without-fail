'use strict';

const swiper = new Swiper('.bestsellers-swiper', {
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

catalogModalHandler();
headerDropdownsHandler();
toggleHeaderHeight();
