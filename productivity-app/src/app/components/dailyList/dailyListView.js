import GlobalListView from "../globalList/globalListView";

class DailyListView extends GlobalListView {
    constructor() {
        super()
        this.dailyTaskList = document.querySelector('.tasks').firstElementChild
        this.rightTabsContainer = document.querySelector('.task-type__right-side')
        this.toDoTab = document.querySelector('.task-type__to-do')
    }

    render = () => {
        this.hideArrowIcons()
        this.bindAllEvents()
    }

    bindAllEvents = () => {
        if (this.dailyTaskList.classList.contains('binded') !== true) {
            this.bindEditEvent(this.dailyTaskList, 'Daily')
            this.bindPriorityHover(this.dailyTaskList)
            this.bindTabsEvents()
            this.dailyTaskList.classList.add('binded')
        }
    }

    filterTasks = tasks => {
        let filteredTasks
        let isCompletedDisplay

        if (this.toDoTab.classList.contains('active')) {
            filteredTasks = tasks.filter(item => item.model.status.ACTIVE === true)
            isCompletedDisplay = false
        } else {
            filteredTasks = tasks.filter(item => item.model.status.COMPLETED === true)
            isCompletedDisplay = true
        }

        this.dailyTaskList.innerHTML = filteredTasks.map(item => item.view.task).join('')

        if (isCompletedDisplay) {
            Array.from(this.dailyTaskList.querySelectorAll('.tasks__name'))
                .forEach(item => item.classList.add('crossed'))

            Array.from(this.dailyTaskList.querySelectorAll('.tasks__element'))
                .forEach(item => item.classList.add('done'))
        }
    }

    hideArrowIcons = () => Array.from(this.dailyTaskList.querySelectorAll('.icon-arrows-up'))
        .forEach(item => item.classList.add('hidden'))
}

export default DailyListView