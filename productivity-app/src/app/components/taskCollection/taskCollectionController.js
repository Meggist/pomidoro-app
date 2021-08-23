import {eventBus} from "../../eventBus";

class TaskCollectionController {
    constructor(model, view) {
        this.view = view
        this.model = model
        this.taskList = document.querySelector('.tasks__list')

        eventBus.subscribe('getTasksData', this.view.render)
    }
}

export default TaskCollectionController
