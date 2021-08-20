import TaskCollectionController from "./taskCollectionController";
import TaskCollectionModel from './taskColletionModel'
import TaskCollectionView from './taskCollectionView'
class TaskCollection {
    constructor() {
        this.model = new TaskCollectionModel()
        this.view = new TaskCollectionView()
        this.controller = new TaskCollectionController(this.model, this.view)
    }
}

export default TaskCollection

