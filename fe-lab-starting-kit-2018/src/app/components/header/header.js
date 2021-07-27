require('./header.less'); // example of including component's styles

const title = document.querySelector('.header__title');
const header = document.querySelector('.header');
const menu = document.querySelector('.header__menu');
let isTimerHeader = document.querySelector(".timer-header");

window.onscroll = () => {
    if (window.pageYOffset > 110) {
        if (title) {
            title.style.display = 'none';
        }
        header.classList.add('fixed');
        header.classList.add('space-between');
        if (isTimerHeader) {
            header.classList.remove('timer-header');
        }
        document.querySelector('.header__logo').style.display = 'flex';
        if (menu.ElementfirstChild == document.querySelector(".icon-add.menu__icon")) {
            menu.insertAdjacentHTML('afterbegin', '<li class="icon-add menu__icon"></li>')
        }
    } else {
        if (title) {
            title.style.display = 'flex';
        }
        document.querySelector('.header__logo').style.display = 'none';
        header.classList.remove('fixed');
        header.classList.remove('space-between');
        if (isTimerHeader) {
            header.classList.add('timer-header');
        }
        const addMenuIcon = document.querySelector(".icon-add.menu__icon");
        addMenuIcon.parentNode.removeChild(addMenuIcon);
    }
}