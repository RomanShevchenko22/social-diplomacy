const daynow = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const daynow__en = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const month__en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let date = new Date();

const DATE_LANG = document.querySelector('.date-lang__lang');
const DATE_ELEMENT = document.querySelector('.date-lang__date');

DATE_LANG.textContent === 'ENG' ?  DATE_ELEMENT.textContent = "".concat(daynow[date.getDay()], " ").concat(date.getDate(), " ").concat(month[date.getMonth()], " ").concat(date.getFullYear(), " \u0433.") : 
DATE_ELEMENT.textContent = "".concat(daynow__en[date.getDay()], " ").concat(date.getDate(), " ").concat(month__en[date.getMonth()], " ").concat(date.getFullYear());

