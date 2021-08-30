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
        this.tasks = tasks
        this.view.render(tasks)
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
}

export default DailyListController