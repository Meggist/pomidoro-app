import {eventBus} from "../../eventBus";

class GlobalListModel {
    constructor(taskCollection) {
        this.taskCollection = taskCollection.model.tasks
        this.filteredTasks = {
            'work': [],
            'education': [],
            'hobby': [],
            "sport": [],
            'other': []
        }
    }

    render = () => {
        this.taskCollection = this.taskCollection.filter(item => item.model.status.GLOBAL_LIST === true)
        this.taskCollection.forEach(item => this.filteredTasks[item.model.categoryId].push(item))
        eventBus.publish('renderGlobalTasks', this.filteredTasks)
    }

}

export default GlobalListModel