import template from './globalList_tmpl.hbs'
import {eventBus} from "../../eventBus";

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
        this.bindPriorityHover()
        this.bindClicksEvent()
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

    bindClicksEvent = () => {
        if (this.globalList.classList.contains('binded') !== true) {
            this.globalList.addEventListener('click', this.clicksEvent)
            this.globalList.classList.add('binded')
        }
    }

    clicksEvent = ({target}) => {
        if (target.classList.contains('icon-global-list-arrow-down')) {
            target.className = 'icon-global-list-arrow-right global-list__arrow'
            this.globalList.querySelector('.global-list-groups').classList.add('hidden')
            return
        }

        if (target.classList.contains('icon-global-list-arrow-right')) {
            target.className = 'icon-global-list-arrow-down global-list__arrow'
            this.globalList.querySelector('.global-list-groups').classList.remove('hidden')
        }


    }
}

export default GlobalListView