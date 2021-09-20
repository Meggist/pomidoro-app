import GlobalListView from "../globalList/globalListView";
import {eventBus} from "../../eventBus";

class DailyListView extends GlobalListView {
    constructor() {
        super()
        this.dailyTaskList = document.querySelector('.tasks').firstElementChild
        this.rightTabsContainer = document.querySelector('.task-type__right-side')
        this.toDoTab = document.querySelector('.task-type__to-do')
        this.filteredTasks = {
            active: [],
            completed: []
        }
        this.completedTaskIds = []
        this.removedTaskIds = []
    }

    render = tasks => {
        this.tasks = tasks
        eventBus.publish('renderDailyList')
    }

    append = () => {
        this.dailyTaskList.innerHTML = this.tasks.map(item => {
            if (item.model.status.COMPLETED === true) {
                this.completedTaskIds.push(item.model.id)
            }

            if (item.model.isRemoved === true) {
                this.removedTaskIds.push(item.model.id)
            }
            return item.view.task
        }).join('')
        this.addCompletedClasses()
        this.checkActiveTab()
        this.bindAllEvents()
        this.hideArrowIcons()
    }

    checkActiveTab = () => {
        const isToDo = Array.from(this.rightTabsContainer.querySelectorAll('.tabs'))
            .filter(item => item.classList.contains('active'))
            .includes(this.toDoTab)
        isToDo ? this.displayTasks('toDo') : this.displayTasks('done')
    }

    addCompletedClasses = () => {
        this.taskElements = Array.from(this.dailyTaskList.querySelectorAll('.tasks__element'))
        this.taskElements.forEach(task => {
            this.removedTaskIds.forEach(id => {
                if (task.id === id) {
                    task.parentNode.removeChild(task)
                }
            })
            this.completedTaskIds.forEach(id => {
                if (task.id === id) {
                    task.classList.add('done')
                    task.querySelector('.tasks__name').classList.add('crossed')
                    task.querySelector('.tasks__icons').classList.add('hidden')
                    task.querySelector('.priority').classList.add('hidden')
                }
            })
        })
    }

    displayTasks = state => {
        const addTaskMessage = document.querySelector('.add-task')
        const taskMessage = document.querySelector('.tasks__message')
        if (state === 'done') {
            addTaskMessage.className = 'add-task hidden'
            taskMessage.className = 'tasks__message hidden'
            this.taskElements.forEach(item => item.classList.contains('done') ?
                item.classList.remove('hidden') : item.classList.add('hidden'))
        } else {
            const activeDailyTasks = Array.from(this.dailyTaskList.querySelectorAll('.tasks__element'))
                .filter(item => !item.classList.contains('done'))
            if (!this.globalList.querySelectorAll('.tasks__element').length && !activeDailyTasks.length) {
                addTaskMessage.classList.remove('hidden')
            }
            this.taskElements.forEach(item => item.classList.contains('done') ?
                item.classList.add('hidden') : item.classList.remove('hidden'))
        }
    }

    bindAllEvents = () => {
        if (this.dailyTaskList.classList.contains('binded') !== true) {
            this.bindEditEvent(this.dailyTaskList, 'Daily')
            this.bindDeleteEvent(this.dailyTaskList, 'Daily')
            this.bindTimerEvent(this.dailyTaskList)
            this.dailyTaskList.classList.add('binded')
        }
    }

    hideArrowIcons = () => Array.from(this.dailyTaskList.querySelectorAll('.icon-arrows-up'))
        .forEach(item => item.classList.add('hidden'))
}

export default DailyListView