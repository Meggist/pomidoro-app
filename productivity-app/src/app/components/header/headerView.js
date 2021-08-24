import template from './header_tmpl.hbs'
import Modal from "../modal/modal";

class HeaderView {

    makeStickyHeader = () => {
        if (window.pageYOffset > 100) {
            if (this.title) {
                this.title.style.display = 'none'
            }
            this.header.classList.add('fixed')
            this.header.classList.add('space-between')
            this.header.querySelector('.header__logo').style.display = 'flex'
            if (this.menu.firstElementChild.classList.contains('hidden')) {
                this.menu.firstElementChild.classList.remove('hidden')
            }
        } else {
            if (this.title) {
                this.title.style.display = 'flex';
            }
            this.header.querySelector('.header__logo').style.display = 'none'
            this.header.classList.remove('fixed')
            this.header.classList.remove('space-between')

            if (!this.menu.firstElementChild.classList.contains('hidden')) {
                this.menu.firstElementChild.classList.add('hidden')
            }
        }
    }
    render = data => template(data)
    append = (data, target) => {
        target.insertAdjacentHTML('afterbegin', data)
        this.getTargets()
        this.bindEvents()
    }

    bindEvents = () => {
        this.menu.addEventListener('click', ({ target }) => {
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

        window.onscroll = this.makeStickyHeader
        this.addTaskButtons.forEach(item => {
            item.onclick = () => {
                this.addTaskModal = new Modal('add')
            }
        })

    }

    getTargets = () => {
        this.header = document.querySelector('.header')
        this.title = document.querySelector('.header__title')
        this.menu = document.querySelector('.header__menu')
        this.addTaskButtons = Array.from(document.querySelectorAll('.headerAddTaskButton'))
    }
}

export default HeaderView