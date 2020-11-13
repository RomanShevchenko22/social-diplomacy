const IMAGE = document.querySelectorAll('.news-list__item-image');
const OVERLAY = document.querySelector('.overlay');


if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

IMAGE.forEach(function (element, i) {
	element.addEventListener('click', function (e) {
		e.preventDefault();
		IMAGE[i].classList.toggle('large');		
		OVERLAY.classList.toggle('overlay-off');

		OVERLAY.addEventListener('click', function (e) {
			e.preventDefault();
			if (!OVERLAY.classList.contains('overlay-off ') && IMAGE[i].classList.contains('large')) {
				OVERLAY.classList.add('overlay-off');
				IMAGE[i].classList.remove('large');
			}
		});
	});
});






