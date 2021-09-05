import {eventBus} from "../../eventBus";

class GlobalListModel {
    constructor(taskCollection) {
        this.taskCollection = taskCollection.tasks
        this.filteredTasks = {
            'work': [],
            'education': [],
            'hobby': [],
            "sport": [],
            'other': []
        }
    }

    render = isChangingTab => {
        if (isChangingTab) {
            Object.keys(this.filteredTasks).forEach(key => this.filteredTasks[key] = [] )
        }
        console.log(this.filteredTasks)
        this.taskCollection = this.taskCollection.filter(item => item.model.status.GLOBAL_LIST === true)
        this.taskCollection.forEach(item =>  this.filteredTasks[item.model.categoryId].push(item))
        eventBus.publish('renderGlobalTasks', this.filteredTasks)
    }

}

export default GlobalListModel