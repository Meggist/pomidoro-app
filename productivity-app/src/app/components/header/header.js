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
        if (menu.firstElementChild.classList.contains('hidden')) {
            menu.firstElementChild.classList.remove('hidden')
        }
    } else {
        if (title) {
            title.style.display = 'flex';
        }
        header.querySelector('.header__logo').style.display = 'none'
        header.classList.remove('fixed')
        header.classList.remove('space-between')
        if (isTimerHeader === null) {
            header.classList.add('timer-header')
        }

        if (!menu.firstElementChild.classList.contains('hidden')) {
            menu.firstElementChild.classList.add('hidden')
        }
    }
}

let headers = Array.from(document.getElementsByClassName('header'))
headers.forEach(item => {
    if (item.parentNode.classList.contains('hidden')) {} else {
        title = item.querySelector('.header__title')
        header = item
        menu = item.querySelector('.header__menu')
        isTimerHeader = item.querySelector(".timer-header")
        window.onscroll = createStickyHeader

        menu.addEventListener('click', ({ target }) => {
            if (target.className === 'icon-list menu__button') {
                window.location.href = "http://localhost:3000/task-list"
            }

            if (target.className === 'icon-settings menu__button') {
                window.location.href = "http://localhost:3000/settings"
            }

            if (target.className === 'icon-statistics menu__button') {
                window.location.href = "http://localhost:3000/reports"
            }
        })
    }


})