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
        this.addFirstTask = document.querySelector('.add-first-task')
        this.lists = document.querySelector('.lists')
        this.dailyEmptyMessage = document.querySelector('.tasks__message')
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

    displayLists = db => {
        const headerTrash = document.querySelector('.header-remove')
        this.firstPage.className = 'first-visit hidden'
        if (!db.tasks.length) {
            headerTrash.className = 'menu__icon header-remove hidden'
            this.lists.className = 'lists hidden'
            this.addFirstTask.className = 'add-first-task'
        } else {
            this.addFirstTask.className = 'add-first-task hidden'
            this.lists.classList.remove('hidden')
            headerTrash.classList.remove('hidden')
        }
        this.displayDailyList(db)
    }

    displayDailyList = db => {
        db.tasks.filter(item => item.model.status.DAILY_LIST === true).length ?
            this.dailyEmptyMessage.className = 'tasks__message hidden' :
            this.dailyEmptyMessage.className = 'tasks__message'
    }
}

export default TaskListView