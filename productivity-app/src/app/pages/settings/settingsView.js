import template from "./settings.hbs";

class SettingsView {
    constructor(state) {
        this.state = state
    }

    append = () => {
        document.getElementById('root').innerHTML = template()
        this.getTargets()
    }

    getTargets = () => {
        this.pomodorosTab = document.querySelector('.settings__pomodoros')
        this.categoriesTab = document.querySelector('.settings__Categories')
        this.pomodorosContent = document.querySelector('.settings__page--pomodoros')
        this.categoriesContent = document.querySelector('.settings__page--categories')
        this.categoriesTasksButton = Array.from(document.querySelectorAll('.settings__goToTasks'))
    }

    display = () => {
        this.categoriesTasksButton.forEach(item => item.onclick = () => window.location.href = "http://localhost:3000/task-list")
        this.pomodorosTab.onclick = () => window.location.href = "http://localhost:3000/settings/pomodoros"
        this.categoriesTab.onclick = () => window.location.href = "http://localhost:3000/settings/categories"
        this.state === 'pomodoros' ? this.displayPomodoros() : this.displayCategories()
    }

    displayPomodoros = () => {
        this.pomodorosTab.className = 'settings__pomodoros tabs active'
        this.categoriesTab.className = 'settings__Categories tabs'
        this.categoriesContent.className = 'settings__page--pomodoros hidden'
        this.pomodorosContent.className = 'settings__page--categories'
    }

    displayCategories = () => {
        this.pomodorosTab.className = 'settings__pomodoros tabs'
        this.categoriesTab.className = 'settings__Categories tabs active'
        this.categoriesContent.className = 'settings__page--pomodoros '
        this.pomodorosContent.className = 'settings__page--categories hidden'
    }
}

export default SettingsView