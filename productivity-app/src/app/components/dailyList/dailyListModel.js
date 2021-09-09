import {eventBus} from "../../eventBus";

class DailyListModel {
    constructor(taskCollection) {
        this.taskCollection = taskCollection.tasks
    }

    render = () => {
        this.taskCollection = this.taskCollection.filter(item => item.model.status.DAILY_LIST === true)
        eventBus.publish('renderDailyTasks', this.taskCollection)
    }
}

export default DailyListModel