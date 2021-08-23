import TaskCollectionController from "./taskCollectionController";
import TaskCollectionModel from './taskColletionModel'
import TaskCollectionView from './taskCollectionView'
import {eventBus} from "../../eventBus";

class TaskCollection {
    constructor() {
        this.model = new TaskCollectionModel()
        this.view = new TaskCollectionView()
        this.controller = new TaskCollectionController(this.model, this.view)
        eventBus.subscribe('renderTasks', this.render)
    }

    render = () => {
        eventBus.publish('finishCollectionRender', this.controller)
    }

}

export default TaskCollection

