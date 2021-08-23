import {eventBus} from "../../eventBus";

class GlobalListModel {
    constructor(taskCollection) {
        this.taskCollection = taskCollection
        this.tasks = taskCollection.model.dataTasks
    }

    render = () => {
        this.tasks = this.tasks.filter(item => item.status.GLOBAL_LIST === true)
        eventBus.publish('renderGlobalTasks', this.tasks)
    }
}

export default GlobalListModel