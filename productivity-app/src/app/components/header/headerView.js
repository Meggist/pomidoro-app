import template from './header_tmpl.hbs'
import Modal from "../modal/modal";
import {eventBus} from "../../eventBus";

class HeaderView {
    constructor() {
        eventBus.subscribe('checkRemoveMode', this.handleRemoveMode)
        this.isRemoveMode = false
    }

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
        this.menu.addEventListener('click', ({target}) => {
            if (target.className === 'icon-list menu__button') {
                window.location.href = "http://localhost:3000/task-list"
            }

            if (target.className === 'icon-settings menu__button') {
                window.location.href = "http://localhost:3000/settings/pomodoros"
            }

            if (target.className === 'icon-statistics menu__button') {
                window.location.href = "http://localhost:3000/reports"
            }
        })

        window.onscroll = this.makeStickyHeader
        this.addTaskButtons.forEach(item => item.onclick = () => new Modal('add', {}))
    }

    getTargets = () => {
        this.header = document.querySelector('.header')
        this.title = document.querySelector('.header__title')
        this.menu = document.querySelector('.header__menu')
        this.addTaskButtons = Array.from(document.querySelectorAll('.headerAddTaskButton'))
    }

    handleRemoveMode = () => {
        this.allTasks = Array.from(document.querySelectorAll('.tasks__element'))
        const removeTabs = Array.from(document.querySelectorAll('.remove-mode__tabs '))

        this.isRemoveMode ? removeTabs.forEach(item => item.classList.remove('hidden')) :
            removeTabs.forEach(item => item.classList.add('hidden'))

        this.allTasks.forEach(task => this.changeTaskMode(task, this.isRemoveMode))
    }

    changeTaskMode = (task, state) => {
        if (state) {
            task.querySelector('.tasks__category-indicator').classList.add('hidden')
            task.querySelector('.tasks__category-indicator--activate').classList.remove('hidden')
            task.querySelector('.tasks__date').classList.add('hidden')
        } else {
            task.querySelector('.tasks__category-indicator').classList.remove('hidden')
            task.querySelector('.tasks__category-indicator--activate').classList.add('hidden')
            task.querySelector('.tasks__date').classList.remove('hidden')
        }
    }

    displaySelectedTasks = amount => {
        const selectedTasksBlock = this.menu.querySelector('.menu__amounts')
        if (amount) {
            selectedTasksBlock.className = 'menu__amounts urgent'
            selectedTasksBlock.textContent = amount
        } else {
            selectedTasksBlock.className = 'menu__amounts urgent hidden'
        }
    }

}

export default HeaderView