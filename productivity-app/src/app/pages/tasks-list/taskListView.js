import template from "./task-list.hbs";

class TaskListView {
    constructor(state) {
        this.state = state
    }

    append = () => {
        document.body.innerHTML = template()
        this.getTargets()
    }

    getTargets = () => {
        this.firstPage = document.querySelector('.first-visit')
        this.addFirstTask = document.querySelector('.add-first-task')
        this.lists = document.querySelector('.lists')
    }

    displayPage = db => {
        console.log(this.state === 'first' && !!db.tasks.length === false)
        if (this.state === 'first' && !db.tasks.length) {
            this.state = false
            const skipButton = document.querySelector('.buttons__skip')
            const goToSettingsButton = document.querySelector('.buttons__go-to-settings')

            this.firstPage.classList.remove('hidden')

            this.firstPage.addEventListener('click', ({target}) => {
                if (target === goToSettingsButton) {
                    window.location.href = "http://localhost:3000/settings"
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
        this.firstPage.className = 'first-visit hidden'
        if (!db.tasks.length) {
            this.lists.className = 'lists hidden'
            this.addFirstTask.className = 'add-first-task'
        } else {
            this.addFirstTask.className = 'add-first-task hidden'
            this.lists.classList.remove('hidden')
        }
    }
}

export default TaskListView