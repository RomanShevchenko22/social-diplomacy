const ALL_NEWS = document.querySelectorAll('.news-list__item');
const NEWS_LIST = document.querySelector('.news-list');
const CATEGORIES = document.querySelectorAll('.aside__categories-item')
const AMOUNT_NEWS = document.querySelectorAll('.amount-news');

const HEAD_LOGO = document.querySelector('.main-nav__logo');
const HEAD_CATEGORIES = document.querySelectorAll('.site-list__item');

const EDUCATION = document.querySelectorAll('.education');
const BUSINESS = document.querySelectorAll('.business');
const NKO = document.querySelectorAll('.nko');
const HEALTH = document.querySelectorAll('.health');
const CULTURE = document.querySelectorAll('.culture');

if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

AMOUNT_NEWS[0].textContent = ALL_NEWS.length;
AMOUNT_NEWS[1].textContent = EDUCATION.length;
AMOUNT_NEWS[2].textContent = BUSINESS.length;
AMOUNT_NEWS[3].textContent = NKO.length;
AMOUNT_NEWS[4].textContent = HEALTH.length;
AMOUNT_NEWS[5].textContent = CULTURE.length;

const render = function (name) {
	NEWS_LIST.textContent = '';	
	for (let i = 0; i < name.length; i++) {
		NEWS_LIST.appendChild(name[i]);
	}	
	for (let i = 0; i < HEAD_CATEGORIES.length; i++) {
		HEAD_CATEGORIES[i].classList.remove('site-list__item--active');
	};	
	backToTop();
}

const filter = function (element,i ) {
	element.addEventListener('click', function (e) {
		e.preventDefault();
		switch (CATEGORIES[i].id) {
			case ('education'):
				render(EDUCATION);
				HEAD_CATEGORIES[0].classList.add('site-list__item--active');
				break;
			case ('business'):
				render(BUSINESS);	
				HEAD_CATEGORIES[1].classList.add('site-list__item--active');
				break;
			case ('npo'):
				render(NKO);
				HEAD_CATEGORIES[2].classList.add('site-list__item--active');
				break;
			case ('health'):
				render(HEALTH);	
				HEAD_CATEGORIES[3].classList.add('site-list__item--active');
				break;
			case ('culture'):
				render(CULTURE);	
				HEAD_CATEGORIES[4].classList.add('site-list__item--active');
				break;
			default: 			
			  render(ALL_NEWS);			
		}
	})
};

HEAD_LOGO.addEventListener('click', function(e) {
	e.preventDefault();
	render(ALL_NEWS);
	NAV_TOGGLE.classList.remove('main-nav__toggle--open');
	NAV_MENU.classList.remove('main-nav__wrapper-list--open');
});

HEAD_CATEGORIES.forEach(function (element, i) {
	filter(element,i + 1);
  element.addEventListener('click', function (evt) {
		evt.preventDefault();
		NAV_TOGGLE.classList.remove('main-nav__toggle--open');
		NAV_MENU.classList.remove('main-nav__wrapper-list--open');
	});}
	);

CATEGORIES.forEach(function (element, i) {
	filter(element,i )}
	);
