import {eventBus} from "../../eventBus";
import Modal from "../modal/modal";

class GlobalListController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('renderGlobalTasks', this.render)
        eventBus.subscribe('renderGlobalList', this.append)
        eventBus.subscribe('editTask', this.editTask)
        this.filterTasks()
    }

    render = tasks => {
        this.tasks = tasks
        this.view.render(tasks)
    }


    filterTasks = () => this.model.render()

    append = template => this.view.append(template)

    editTask = id => {
        const editedTask = Object.values(this.tasks)
            .find(item => item.find(item => item.model.id === id))[0]
        new Modal('edit', editedTask)
    }

}

export default GlobalListController