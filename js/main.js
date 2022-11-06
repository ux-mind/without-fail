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
  spaceBetween: 15,
  slideToClickedSlide: true,
  loop: true,
  navigation: {
    prevEl: '.product-swiper-additional-prev',
    nextEl: '.product-swiper-additional-next',
  },
  breakpoints: {
    992: {
      slidesPerView: 4,
      spaceBetween: 23,
    },
    768: {
      slidesPerView: 'auto',
      spaceBetween: 25,
    },
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

function handleProductInfoTabs() {
  const tabs = document.querySelectorAll('.product-info__tab');
  const infoBlocks = document.querySelectorAll('.product-info__parameters');

  tabs.forEach((tab) => {
    if (tab) {
      const id = tab.id;

      const infoBlock = document.querySelector(
        `.product-info__parameters#${id}`
      );

      if (infoBlock) {
        tab.onclick = () => {
          infoBlocks.forEach((block) => block.classList.remove('active'));
          tabs.forEach((tab) => tab.classList.remove('active'));

          tab.classList.add('active');
          infoBlock.classList.add('active');
        };
      }
    }
  });
}

// For handle form input depends on stars count to correctly submit it
function handleTestimonialsStars() {
  const starsBlock = document.querySelector(
    '.testimonial-modal-form__stars .stars'
  );

  const starsInput = document.querySelector('#stars-input');

  if (starsBlock && starsInput) {
    starsBlock.addEventListener('click', (e) => {
      const targetStar = e.target.closest('.star-btn');

      if (targetStar) {
        let starsCount = 1;

        for (const star of starsBlock.children) {
          star.classList.remove('star_active');
        }

        for (const star of starsBlock.children) {
          if (star === targetStar) {
            star.classList.add('star_active');
            break;
          }

          starsCount += 1;
          star.classList.add('star_active');
        }

        starsInput.value = starsCount;
      }
    });
  }
}

function handleFixedModalClose() {
  const modals = document.querySelectorAll('.modal-fixed');

  modals.forEach((el) => {
    const closeBtn = el.querySelector('.modal-close__btn');

    closeBtn.addEventListener('click', () => {
      el.classList.remove('opened');
      blocker.classList.remove('blocker_opened');
    });
  });
}

function handleTestimonialModalOpen() {
  const modal = document.querySelector('#testimonial-modal');
  const btn = document.querySelector('.product-testimonials__pass-btn');

  if (modal && btn) {
    btn.addEventListener('click', () => {
      modal.classList.add('opened');
      blocker.classList.add('blocker_opened');
    });
  }
}

function handleTestimonialModalSumbit() {
  const modal = document.querySelector('#testimonial-modal');
  const successModal = document.querySelector('#testimonial-modal-success');
  const testimonialForm = modal.querySelector('.testimonial-modal-form');

  if (testimonialForm && successModal) {
    testimonialForm.addEventListener('submit', (e) => {
      e.preventDefault();

      modal.classList.remove('opened');
      successModal.classList.add('opened');
    });
  }
}

function handleProductParametersMobile() {
  const productButtons = document.querySelectorAll('.product-info-mobile__btn');

  productButtons.forEach((btn) => {
    btn.onclick = () => btn.classList.toggle('active');
  });
}

catalogModalHandler();
headerDropdownsHandler();
toggleHeaderHeight();
footerDropdownHandler();
footerScrollTop();
catalogAsideHandler();
handleProductInfoDrop();
handleProductTable();
handleProductInfoTabs();
handleTestimonialsStars();
handleFixedModalClose();
handleTestimonialModalOpen();
handleTestimonialModalSumbit();
handleProductParametersMobile();
