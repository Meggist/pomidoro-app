import template from './globalList_tmpl.hbs'
import {eventBus} from "../../eventBus";
import Modal from "../modal/modal";

class GlobalListView {
    constructor() {
        this.isFirst = true
        this.globalList = document.querySelector('.global-list-section')
        this.globalGroupsList = document.querySelector('.global-list-groups')
    }

    render = tasks => {
        eventBus.publish('renderGlobalList', template(tasks))
    }

    append = template => {
        this.globalGroupsList.innerHTML = template
        this.displayGroups()
        this.bindAllEvents()
    }

    bindAllEvents = () => {
        if (this.globalList.classList.contains('binded') !== true) {
            this.bindPriorityHover()
            this.bindShowHideEvent()
            this.bindEditEvent()
            this.globalList.classList.add('binded')
        }
    }

    bindPriorityHover = () => {
        this.globalGroupsList.addEventListener('mouseover', ({target}) => {
            if (target.classList.contains('tasks__tomato')) {
                target.parentNode.querySelector('.tasks__num').classList.add('hidden')
                target.parentNode.querySelector('.icon-timer').classList.remove('hidden')
                target.parentNode.querySelector('.icon-tomato').classList.add('hidden')
            }

        })

        this.globalGroupsList.addEventListener('mouseout', ({target}) => {
            if (target.classList.contains('tasks__tomato')) {
                target.parentNode.querySelector('.tasks__num').classList.remove('hidden')
                target.parentNode.querySelector('.icon-timer').classList.add('hidden')
                target.parentNode.querySelector('.icon-tomato').classList.remove('hidden')
            }
        })
    }

    displayGroups = () => {
        this.groups = Array.from(this.globalGroupsList.querySelectorAll('.tasks-group'))
        this.groups = this.groups.filter(item => {
            if (item.querySelector('.tasks__list').innerHTML.includes('li')) {
                item.classList.remove('hidden')
                return true
            }
        })

        this.groups.forEach(item => {
            const taskElems = Array.from(item.querySelectorAll('.tasks__element'))
            if (taskElems.length > 1) {
                taskElems
                    .slice(0, taskElems.length - 1)
                    .forEach(item => item.querySelector('.tasks__category-indicator').classList.add('connected'))
            }
        })
    }

    bindShowHideEvent = () =>  this.globalList.addEventListener('click', this.showGlobalListEvent)



    showGlobalListEvent = ({target}) => {
        if (target.classList.contains('icon-global-list-arrow-down')) {
            target.className = 'icon-global-list-arrow-right global-list__arrow'
            this.globalList.querySelector('.global-list-groups').classList.add('hidden')
            this.globalList.querySelector('.global-list__right-side').classList.add('hidden')
            return
        }

        if (target.classList.contains('icon-global-list-arrow-right')) {
            target.className = 'icon-global-list-arrow-down global-list__arrow'
            this.globalList.querySelector('.global-list-groups').classList.remove('hidden')
            this.globalList.querySelector('.global-list__right-side').classList.remove('hidden')
        }

    }

    bindEditEvent = () => {
        this.globalList.addEventListener('click', ({target}) => {
            if (target.classList.contains('tasks__edit')) {
                eventBus.publish('editTask', target.closest('.tasks__element').id)
            }
        })
    }
}

export default GlobalListView