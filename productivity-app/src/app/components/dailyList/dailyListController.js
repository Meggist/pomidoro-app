import {eventBus} from "../../eventBus";
import Modal from "../modal/modal";

class DailyListController {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.bindTabsEvents()
        eventBus.subscribe('renderDailyTasks', this.render)
        eventBus.subscribe('renderDailyList', this.append)
        eventBus.subscribe('editDailyTask', this.editTask)
        eventBus.subscribe('deleteDailyTask', this.deleteTask)
        this.filterTasks()
    }

    render = tasks => {
        this.tasks = tasks
        this.view.render(tasks)
    }

    append = () => this.view.append()

    filterTasks = () => this.model.render()

    editTask = id => {
        let editedTask
        this.tasks.forEach(item => {
            if (item.model.id === id) {
                editedTask = item
            }
        })
        const modal = new Modal('edit', editedTask)
    }

    deleteTask = id => new Modal('delete', id)

    bindTabsEvents = () => {
        this.view.rightTabsContainer.addEventListener('click', event => {
            if (event.target.classList.contains('tabs')) {
                const tabs = this.view.rightTabsContainer.querySelectorAll('.tabs')
                tabs.forEach(item => item.classList.remove('active'))
                event.target.classList.add('active')
                this.view.checkActiveTab()
            }
        })
    }
}

export default DailyListController