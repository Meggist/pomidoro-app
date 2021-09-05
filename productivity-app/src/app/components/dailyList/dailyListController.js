import {eventBus} from "../../eventBus";
import Modal from "../modal/modal";

class DailyListController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('renderDailyTasks', this.render)
        eventBus.subscribe('editDailyTask', this.editTask)
        this.filterTasks()
    }

    render = tasks => {
        this.bindTabsEvents()
        this.tasks = tasks
        this.view.filterTasks(this.tasks)
        this.view.render()
    }

    filterTasks = () => this.model.render()

    editTask = id => {
        let editedTask
        this.tasks.forEach(item => {
            if (item.model.id === id) {
                editedTask = item
            }
        })
        new Modal('edit', editedTask)
    }

    bindTabsEvents = () => {
        this.view.rightTabsContainer.addEventListener('click', event => {
            if (event.target.classList.contains('tabs')) {
                event.stopImmediatePropagation()
                const tabs = this.view.rightTabsContainer.querySelectorAll('.tabs')
                tabs.forEach(item => item.classList.remove('active'))
                event.target.classList.add('active')
                this.filterTasks()
            }
        })
    }
}

export default DailyListController