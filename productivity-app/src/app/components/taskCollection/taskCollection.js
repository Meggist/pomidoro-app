import TaskCollectionModel from './taskColletionModel'
import {eventBus} from "../../eventBus";

class TaskCollection {
    constructor() {
        this.model = new TaskCollectionModel()
        eventBus.subscribe('renderTasks', this.render)
    }

    render = () => {
        eventBus.publish('finishCollectionRender', this.model)
    }

}

export default TaskCollection

