import template from "./task-list.hbs";

class TaskListView {
    constructor(state) {
        this.state = state
    }

    append = () => {
        document.getElementById('root').innerHTML = template()
        this.getTargets()
    }

    getTargets = () => {
        this.firstPage = document.querySelector('.first-visit')
        this.addTask = document.querySelector('.add-task')
        this.addFirstTask = document.querySelector('.add-first-task')
        this.lists = document.querySelector('.lists')
        this.dailyEmptyMessage = document.querySelector('.tasks__message')
        this.globalList = document.querySelector('.global-list-section')
    }

    displayPage = db => {
        if (this.state === 'first' && !db.tasks.length) {
            this.state = false
            const skipButton = document.querySelector('.buttons__skip')
            const goToSettingsButton = document.querySelector('.buttons__go-to-settings')

            this.firstPage.classList.remove('hidden')

            this.firstPage.addEventListener('click', ({target}) => {
                if (target === goToSettingsButton) {
                    window.location.href = "http://localhost:3000/settings/pomodoros"
                    return
                }

                if (target === skipButton) {
                    this.displayLists(db)
                }
            })
        } else {
            this.displayLists(db)
        }
    }

    displayAddFirstTask = () => {
        this.firstPage.classList.add('hidden')
        this.addFirstTask.classList.remove('hidden')
        this.dailyEmptyMessage.className = 'tasks__message hidden'
        this.globalList.classList.add('hidden')
        this.lists.className = 'lists hidden'
        this.addTask.className = 'add-task hidden'
    }

    displayLists = db => {
        if (!db.tasks.length) {
            this.displayAddFirstTask()
            return
        }
        const tasks = db.tasks.filter(item => item.model.isRemoved === false)
        const headerTrash = document.querySelector('.header-remove')
        this.firstPage.className = 'first-visit hidden'
        this.addFirstTask.className = 'add-first-task hidden'
        this.addTask.className = 'add-task hidden'
        this.dailyEmptyMessage.className = 'tasks__message hidden'
        if (!tasks.length) {
            headerTrash.className = 'menu__icon header-remove hidden'
            this.lists.className = 'lists hidden'
            this.addTask.className = 'add-task hidden'
            this.dailyEmptyMessage.className = 'tasks__message hidden'
        } else {
            this.globalList.classList.remove('hidden')
            this.addFirstTask.className = 'add-first-task hidden'
            this.lists.classList.remove('hidden')
            headerTrash.classList.remove('hidden')
        }
        this.displayDailyList(db)
    }

    displayDailyList = db => {
        const globalTasks = db.tasks.filter(item => item.model.status.GLOBAL_LIST === true)
        const activeDailyTasks = db.tasks
            .filter(item => item.model.isRemoved === false)
            .filter(item => item.model.status.DAILY_LIST === true && item.model.status.COMPLETED === false)
        if (activeDailyTasks.length) {
            this.dailyEmptyMessage.className = 'tasks__message hidden'
        } else {
            if (globalTasks.length) {
                this.dailyEmptyMessage.className = 'tasks__message'
            } else {
                this.globalList.className = 'global-list-section hidden'
                this.addTask.classList.remove('hidden')
            }
        }


    }

}

export default TaskListView