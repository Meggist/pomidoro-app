import {taskItemController} from "../taskItem/taskItemController";
import {eventBus} from "../../eventBus";

let taskCollectionController

eventBus.subscribe('loadTasks', () => taskCollectionController = new TaskCollectionController(taskItemController))

class TaskCollectionController {
    constructor(taskItems) {
        this.taskList = document.querySelector('.tasks__list')
        taskItems.htmlTasks.forEach(item => this.taskList.innerHTML += item)
    }
}