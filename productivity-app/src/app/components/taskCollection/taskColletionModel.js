import {dataBase} from "../../firebase";
import {eventBus} from "../../eventBus";
import TaskItem from "../taskItem/taskItem";

class TaskCollectionModel {
    constructor() {
        this.getTasksData()
        eventBus.subscribe('updateTaskCollection', this.getTasksData)
    }

    getTasksData = () => {
        this.dataTasks = []
        this.tasks = []
        dataBase.db.ref('taskCollection').get().then(snapshot => {
            snapshot.forEach(snapshotChild => {
                const data = snapshotChild.val()
                data.id = snapshotChild.key
                this.tasks.push(new TaskItem(data))
                this.dataTasks.push(data)
            })
        }).then(() => eventBus.publish('getTasksData', this.tasks))
    }
}

export default TaskCollectionModel