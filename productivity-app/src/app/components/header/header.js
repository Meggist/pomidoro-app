require('./header.less'); // example of including component's styles

let title;
let header;
let menu;
let isTimerHeader;

const createStickyHeader = () => {
    if (window.pageYOffset > 100) {
        if (title) {
            title.style.display = 'none';
        }
        header.classList.add('fixed');
        header.classList.add('space-between');
        if (isTimerHeader === null) {
            header.classList.remove('timer-header');
        }
        header.querySelector('.header__logo').style.display = 'flex';
        if (menu.firstElementChild.firstElementChild.classList.contains('icon-add') !== true) {
            menu.insertAdjacentHTML('afterbegin', '<li class="menu__icon"><button class="icon-add menu__button"></button></li>')
        }
    } else {
        if (title) {
            title.style.display = 'flex';
        }
        header.querySelector('.header__logo').style.display = 'none';
        header.classList.remove('fixed');
        header.classList.remove('space-between');
        if (isTimerHeader === null) {
            header.classList.add('timer-header');
        }

        if (menu.querySelector(".icon-add.menu__button")) {
            const addMenuIcon = menu.querySelector(".icon-add").parentNode;
            addMenuIcon.parentNode.removeChild(addMenuIcon);
        }
    }
}

let headers = Array.from(document.getElementsByClassName('header'));
headers.forEach(h => {
    if (h.parentNode.classList.contains('hidden')) {
    } else {
        title = h.querySelector('.header__title');
        header = h;
        menu = h.querySelector('.header__menu');
        isTimerHeader = h.querySelector(".timer-header");
        window.onscroll = createStickyHeader;
    }
})



