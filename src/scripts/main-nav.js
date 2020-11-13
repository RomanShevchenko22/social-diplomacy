// Header
// pageHeader.classList.remove("page-header__nojs");
// navMain.classList.remove("main-nav__nojs");

const NAV_TOGGLE = document.querySelector(".main-nav__toggle");
const NAV_MENU = document.querySelector(".main-nav__wrapper-list");
NAV_TOGGLE.addEventListener("click", function (evt) {
  evt.preventDefault();
  NAV_TOGGLE.classList.toggle('main-nav__toggle--open');
  NAV_MENU.classList.toggle('main-nav__wrapper-list--open');
});