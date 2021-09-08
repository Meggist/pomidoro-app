import template from './globalList_tmpl.hbs'
import {eventBus} from "../../eventBus"
import {router} from "../../router";
import Timer from "../../pages/timer/timer";
import {dataBase} from "../../firebase";

class GlobalListView {
    constructor() {
        this.globalList = document.querySelector('.global-list-section')
        this.globalGroupsList = document.querySelector('.global-list-groups')
    }

    render = tasks => {
        this.renderedTemplate = template(tasks)
        eventBus.publish('renderGlobalList')
    }

    append = () => {
        this.globalGroupsList.innerHTML = this.renderedTemplate
        this.displayGroups()
        this.filterGroups()
        this.bindAllEvents()
        eventBus.publish('displayAllTasks')
        eventBus.publish('checkRemoveMode')
    }

    bindAllEvents = () => {
        if (this.globalList.classList.contains('binded') !== true) {
            this.bindShowHideEvent()
            this.bindEditEvent(this.globalList, 'Global')
            this.bindDeleteEvent(this.globalList, 'Global')
            this.bindMoveToDailyListEvent()
            this.globalList.classList.add('binded')
        }
    }

    filterGroups = () => {
        let priority
        const tabs = Array.from(document.querySelectorAll('.global-list__tab'))
        const tabNames = tabs.map(item => item.textContent.toLowerCase())
        const taskGroups = Array.from(document.querySelectorAll('.tasks-group'))
            .filter(item => !item.classList.contains('hidden'))

        tabs.forEach(item => {
            if (item.classList.contains('active')) {
                priority = item.textContent.toLowerCase()
            }
        })

        if (priority !== 'all') {
            taskGroups.forEach(taskGroup => {
                let isEmpty = true
                let taskElements = Array.from(taskGroup.querySelectorAll('.tasks__element'))
                taskElements.forEach(task => {
                    const priorityElement = task.querySelector('.priority')
                    if (!priorityElement.classList.contains(priority)) {
                        task.classList.add('hidden')
                    } else {
                        isEmpty = false
                    }
                })
                if (isEmpty) {
                    taskGroup.classList.add('hidden')
                } else {
                    this.addConnectLine(taskGroup)
                }
            })
        } else {
            taskGroups.forEach(item => this.addConnectLine(item))
        }
    }

    bindTimerEvent = target => {
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

        target.addEventListener('click', ({target}) => {
            if (target.classList.contains('tasks__tomato')) {
                const id = target.closest('.tasks__element').id
                dataBase.updateField(`taskCollection/${id}/status`, {ACTIVE: true})
                    .then(() => window.location.href = 'http://localhost:3000/timer')
            }
        })
    }

    bindDeleteEvent = (target, type) => {
        target.addEventListener('click', ({target}) => {
            if (target.classList.contains('tasks__trash')) {
                eventBus.publish(`delete${type}Task`, target.closest('.tasks__element').id)
                return
            }

            if (target.classList.contains('tasks__trash')) {
                eventBus.publish(`delete${type}Task`, target.closest('.tasks__element').id)

            }
        })
    }

    displayGroups = () => {
        let groups = Array.from(this.globalGroupsList.querySelectorAll('.tasks-group'))
        groups.filter(item => {
            const taskElements = Array.from(item.querySelectorAll('.tasks__element'))
            if (taskElements.find(item => !item.classList.contains('hidden'))) {
                item.classList.remove('hidden')
                return true
            }
        })
    }

    addConnectLine = item => {
        const taskElems = Array.from(item.querySelectorAll('.tasks__element'))
            .filter(item => !item.classList.contains('hidden'))
        if (taskElems.length > 1) {
            taskElems
                .slice(0, taskElems.length - 1)
                .forEach(item => {
                    item.querySelector('.tasks__category-indicator--activate').firstElementChild
                        .classList.add('connected--activate')
                    item.querySelector('.tasks__category-indicator').classList.add('connected')
                })
        }
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