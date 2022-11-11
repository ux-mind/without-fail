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
const blockerHeader = document.querySelector('.blocker-header');

function handleMobileMenu() {
  const btn = document.querySelector('.header__logo .hamburger');
  const menu = document.querySelector('.m-menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      btn.classList.toggle('close');
      menu.classList.toggle('m-menu_opened');
      document.documentElement.classList.toggle('is-locked');
    });
  }
}

function catalogModalHandler() {
  const modal = document.querySelector('#catalog-modal');
  const button = document.querySelector('#catalog-btn');

  button.addEventListener('click', () => {
    modal.classList.toggle('opened');
    blockerHeader.classList.toggle('blocker_opened');
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

  if (btn) {
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
}

function handleProductTable() {
  const btn = document.querySelector('.product-parameters__more');

  if (btn) {
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
  const btns = document.querySelectorAll('.product-testimonials__pass-btn');

  btns.forEach((btn) => {
    if (modal && btn) {
      btn.addEventListener('click', () => {
        modal.classList.add('opened');
        blocker.classList.add('blocker_opened');
      });
    }
  });
}

function handleTestimonialModalSumbit() {
  const modal = document.querySelector('#testimonial-modal');
  const successModal = document.querySelector('#testimonial-modal-success');

  if (modal) {
    const testimonialForm = modal.querySelector('.testimonial-modal-form');

    if (testimonialForm && successModal) {
      testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();

        modal.classList.remove('opened');
        successModal.classList.add('opened');
      });
    }
  }
}

function handleProductParametersMobile() {
  const productButtons = document.querySelectorAll('.product-info-mobile__btn');

  productButtons.forEach((btn) => {
    btn.onclick = () => btn.classList.toggle('active');
  });
}

function handleTestimonialContent() {
  const showMoreBtns = document.querySelectorAll(
    '.product-testimonial-content__btn'
  );

  showMoreBtns.forEach((btn) => {
    let textContainer = btn.previousSibling;

    while (textContainer && textContainer.nodeType != 1) {
      textContainer = textContainer.previousSibling;
    }

    if (textContainer.matches('.product-testimonial-content__wrapper')) {
      btn.onclick = () => {
        textContainer.classList.add('opened');
        btn.style.display = 'none';
      };
    }
  });
}

function handleApplicationModal() {
  const btn = document.querySelector('#application-modal-btn');
  const modal = document.querySelector('#application-modal');

  if (btn && modal) {
    btn.onclick = () => {
      modal.classList.add('opened');
      blocker.classList.add('blocker_opened');
    };
  }
}

function handleApplicationModalSumbit() {
  const modal = document.querySelector('#application-modal');
  const successModal = document.querySelector('#application-modal-success');

  if (modal) {
    const testimonialForm = modal.querySelector('.application-modal-form');

    if (testimonialForm && successModal) {
      testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();

        modal.classList.remove('opened');
        successModal.classList.add('opened');
      });
    }
  }
}

function handleMobileMenuCatalog() {
  const btn = document.querySelector('.m-menu-catalog__btn');
  const list = document.querySelector('.m-menu-catalog-list');

  if (btn && list) {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  }
}

function handleMobileMenuDropdowns() {
  const dropdownButtons = document.querySelectorAll('.m-menu-dropdown__btn');

  dropdownButtons.forEach((btn) => {
    const dropdown = btn.nextElementSibling;

    if (dropdown.matches('.m-menu-dropdown-list')) {
      btn.addEventListener('click', () => btn.classList.toggle('active'));
    }
  });
}

function mobileMenuCallHandler() {
  const callBtn = document.querySelector('.m-menu__call');
  const applicationModal = document.querySelector('#application-modal');
  const menu = document.querySelector('.m-menu');
  const menuBtn = document.querySelector('.header__logo .hamburger');

  if (callBtn && applicationModal) {
    callBtn.addEventListener('click', () => {
      applicationModal.classList.add('opened');
      blocker.classList.add('blocker_opened');

      if (menu && menuBtn) {
        menuBtn.classList.remove('close');
        menu.classList.remove('m-menu_opened');
        document.documentElement.classList.remove('is-locked');
      }
    });
  }
}

function orderCallHandler() {
  const callBtns = [
    document.querySelector('.connect-ways__title .btn'),
    document.querySelector('.order-a-call'),
  ];
  const applicationModal = document.querySelector('#application-modal');

  callBtns.forEach((btn) => {
    if (btn && applicationModal) {
      btn.addEventListener('click', (e) => {
        if (btn.matches('a')) {
          e.preventDefault();
        }

        applicationModal.classList.add('opened');
        blocker.classList.add('blocker_opened');
      });
    }
  });
}

function handleHomeCatalogPictures() {
  const catalogMainImg = document.querySelector('.home-catalog-img-1 img');
  const catalogAdditionalImg = document.querySelector(
    '.home-catalog-img-2 img'
  );

  const catalogLinks = document.querySelectorAll(
    '.home-catalog .home-catalog__item .link'
  );

  if (catalogMainImg && catalogAdditionalImg) {
    catalogLinks.forEach((link) => {
      const mainImgSrc = link.dataset.imgMain;
      const additionalImgSrc = link.dataset.imgAdditional;

      link.addEventListener('mouseover', () => {
        catalogMainImg.src = mainImgSrc;
        catalogMainImg.srcset = mainImgSrc;

        catalogAdditionalImg.src = additionalImgSrc;
        catalogAdditionalImg.srcset = additionalImgSrc;
      });
    });
  }
}

function questionsFormSubmit() {
  const submitForm = document.querySelector('#questions-form');
  const modal = document.querySelector('#application-modal-success');

  if (submitForm && modal) {
    submitForm.addEventListener('submit', (e) => {
      e.preventDefault();

      modal.classList.add('opened');
      blocker.classList.add('blocker_opened');
    });
  }
}

function politicsCheckboxDisableHandler() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkboxInput) => {
    const checkboxInputWrapper = checkboxInput.closest('div');
    const submitBtn = checkboxInputWrapper
      ? checkboxInputWrapper.nextElementSibling.children[0]
      : null;

    if (submitBtn && submitBtn.matches('button[type="submit"]')) {
      const isChecked = checkboxInput.checked;

      submitBtn.disabled = !isChecked;

      checkboxInput.addEventListener('change', () => {
        const isChecked = checkboxInput.checked;

        submitBtn.disabled = !isChecked;
      });
    }
  });
}

// Function for calling all modal handlers
function callModalHandlers() {
  orderCallHandler();
  catalogModalHandler();
  handleFixedModalClose();
  handleTestimonialModalOpen();
  handleTestimonialModalSumbit();
  handleApplicationModal();
  handleApplicationModalSumbit();
  questionsFormSubmit();
  politicsCheckboxDisableHandler();
}

// Function for calling all dropdown handlers
function callDropdownHandlers() {
  headerDropdownsHandler();
  footerDropdownHandler();
  handleProductInfoDrop();
}

// Function for calling mobile menu handlers
function callMobileMenuHandlers() {
  handleMobileMenu();
  handleMobileMenuCatalog();
  handleMobileMenuDropdowns();
  mobileMenuCallHandler();
}

toggleHeaderHeight();
footerScrollTop();
catalogAsideHandler();
handleProductTable();
handleProductInfoTabs();
handleTestimonialsStars();
handleProductParametersMobile();
handleTestimonialContent();
handleHomeCatalogPictures();

callModalHandlers();
callDropdownHandlers();
callMobileMenuHandlers();
