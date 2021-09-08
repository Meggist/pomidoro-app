import {eventBus} from "../../eventBus";

class HeaderModel {
    constructor(title) {
        this.title = title
        this.checkTitle(this.title)
        this.selectedTasks = []
        eventBus.subscribe('addSelectedTask', this.addSelectedTask)
        eventBus.subscribe('deleteSelectedTask', this.deleteSelectedTask)
    }

    checkTitle = (title) => {
        if (title !== 'Daily Task List') {
            this.addTaskButton = 'hidden'
            this.trash = 'hidden'
        }

        if (title === 'Timer') {
            this.titleState = 'hidden'
        }

        if (title === 'Settings') {
            this.titleState = 'settings-header__text'
        }

        if (title === 'Reports') {
            this.titleState = 'reports-header__text'
        }

    }

    addSelectedTask = id => this.selectedTasks.push(id)
    deleteSelectedTask = id => this.selectedTasks = this.selectedTasks.filter(item => item !== id)

}

export default HeaderModel