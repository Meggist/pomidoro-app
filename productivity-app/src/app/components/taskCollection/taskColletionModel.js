import {dataBase} from "../../firebase";
import {eventBus} from "../../eventBus";
import TaskItem from "../taskItem/taskItem";

class TaskCollectionModel {
    constructor() {
        this.getTasksData()
        eventBus.subscribe('updateTaskCollection', this.getTasksData)
    }

    getTasksData = () => {
        this.tasks = []
        dataBase.db.ref('taskCollection').get()
            .then(collection => {
                const correctCollection = collection.val()
                Object.keys(correctCollection).forEach(key => correctCollection[key].status.ACTIVE = false)
                dataBase.updateField('taskCollection', correctCollection)
                return correctCollection
            }).then(collection => {
            Object.keys(collection).forEach(key => {
                collection[key].id = key
                this.tasks.push(new TaskItem(collection[key]))
            })
        }).then(() => {
            eventBus.publish('renderTasks')
        })
    }
}

export default TaskCollectionModel