import {dataBase} from "../../firebase";
import {eventBus} from "../../eventBus";
import TaskItem from "../taskItem/taskItem";

class TaskCollectionModel {
    constructor() {
        this.getTasksData()
        eventBus.subscribe('updateTaskCollection', this.getTasksData)
    }

    getTasksData = () => {
        dataBase.getFieldFromDB('taskCollection').then(data => {
            this.tasks = Object.values(data).map(item => new TaskItem(item))
            eventBus.publish('getTasksData', this.tasks)
        })
    }
}

export default TaskCollectionModel