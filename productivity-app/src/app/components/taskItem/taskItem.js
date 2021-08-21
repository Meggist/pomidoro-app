import TaskItemController from "./taskItemController";
import TaskItemModel from './taskItemModel'
import TaskItemView from "./taskItemView";

class TaskItem {
    constructor(data) {
        this.model = new TaskItemModel(data)
        this.view = new TaskItemView(this.model)
        this.controller = new TaskItemController(this.model, this.view)
    }
}

export default TaskItem