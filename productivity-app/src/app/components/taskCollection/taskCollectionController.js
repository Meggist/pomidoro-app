import {eventBus} from "../../eventBus";

class TaskCollectionController {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.taskList = document.querySelector('.tasks__list')
        eventBus.subscribe('getTasksData', this.view.render)
        eventBus.subscribe('renderTasks', this.render)
    }

    render = (tasks) => {
        this.view.appendHtml(tasks, this.taskList)
    }
}

export default TaskCollectionController
