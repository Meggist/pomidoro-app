import TaskItemModel from './taskItemModel'
import TaskItemView from "./taskItemView";
import {getFieldFromDB} from "../../firebase";
import {eventBus} from "../../eventBus";

class TaskItemController {
    constructor(Model, View) {
        this.Model = Model
        this.View = View
        this.htmlTasks = []
        this.tasks = []
        getFieldFromDB('taskCollection').then(data => {
            this.tasks = Object.values(data).map(item => new this.Model(item))
            this.htmlTasks = this.tasks.map(item => new View(item).htmltask)
            eventBus.publish('loadTasks')
        })
    }
}



export const taskItemController = new TaskItemController(TaskItemModel, TaskItemView)
