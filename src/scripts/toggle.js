const MORE_BUTTONS = document.querySelectorAll('.news-list__item-more');
const NEWS_TEXTS = document.querySelectorAll('.news-list__item-text');
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

MORE_BUTTONS.forEach( function (element,i ) {
	element.addEventListener('click', function (e) {
		e.preventDefault();
		NEWS_TEXTS[i].style.maxHeight ? NEWS_TEXTS[i].style.maxHeight = null : NEWS_TEXTS[i].style.maxHeight = NEWS_TEXTS[i].scrollHeight + 'px';
	})
});

