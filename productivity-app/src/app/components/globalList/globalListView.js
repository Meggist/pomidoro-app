import template from './globalList_tmpl.hbs'
import {eventBus} from "../../eventBus"

class GlobalListView {
    constructor() {
        this.globalList = document.querySelector('.global-list-section')
        this.globalGroupsList = document.querySelector('.global-list-groups')
    }

    render = tasks => {
        this.startTasks = tasks
        eventBus.publish('renderGlobalList')
    }

    append = () => {
        this.filterGroups()
        this.bindAllEvents()
    }

    bindAllEvents = () => {
        if (this.globalList.classList.contains('binded') !== true) {
            this.bindPriorityHover(this.globalList )
            this.bindShowHideEvent()
            this.bindEditEvent(this.globalList, 'Global')
            this.bindTabsEvents()
            this.bindMoveToDailyListEvent()
            this.globalList.classList.add('binded')
        }
    }

    filterGroups = () => {
        let priority
        const tabs = Array.from(document.querySelectorAll('.global-list__tab'))

        tabs.forEach(item => {
            if (item.classList.contains('active')) {
                priority = item.textContent.toLowerCase()
            }
        })

        if (priority !== 'all') {
            let obj = Object.entries(this.startTasks).map(item => {
                item[1] = item[1].filter(item => {
                    return this.getPriorityByIndex(item.model.priority) === priority
                })
                return item
            })
            obj = Object.fromEntries(obj)
            this.globalGroupsList.innerHTML = template(obj)
        } else {
            this.globalGroupsList.innerHTML = template(this.startTasks)
        }
        this.displayGroups()
    }

    getPriorityByIndex = index => ({
        1: 'low',
        2: 'middle',
        3: 'high',
        4: 'urgent'
    })[index]

    bindTabsEvents = () => {
        this.globalList.addEventListener('click', ({target}) => {
            if (target.className === 'global-list__tab') {
                const tabs = document.querySelectorAll('.global-list__tab')
                tabs.forEach(item => item.classList.remove('active'))
                target.classList.add('active')
                this.filterGroups()
            }
        })
    }

    bindPriorityHover = target => {
        target.addEventListener('mouseover', ({target}) => {
            if (target.classList.contains('tasks__tomato')) {
                target.parentNode.querySelector('.tasks__num').classList.add('hidden')
                target.parentNode.querySelector('.icon-timer').classList.remove('hidden')
                target.parentNode.querySelector('.icon-tomato').classList.add('hidden')
            }
        })

        target.addEventListener('mouseout', ({target}) => {
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

    bindShowHideEvent = () => this.globalList.addEventListener('click', this.showGlobalListEvent)

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

    bindEditEvent = (target, type) => {
        target.addEventListener('click', ({target}) => {
            if (target.classList.contains('tasks__edit')) {
                eventBus.publish(`edit${type}Task`, target.closest('.tasks__element').id)
            }
        })
    }

    bindMoveToDailyListEvent = () => {
        this.globalList.addEventListener('click', ({target}) => {
            if (target.classList.contains('icon-arrows-up')) {
                eventBus.publish(`moveTaskToDailyTask`, target.closest('.tasks__element').id)
            }
        })
    }
}

export default GlobalListView