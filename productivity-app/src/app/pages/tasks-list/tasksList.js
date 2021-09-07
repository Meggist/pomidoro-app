import TaskListView from "./taskListView";
import TaskListController from "./taskListController";
import TaskListModel from "./taskListModel";
import {router} from "../../router";


class TaskList {
    constructor(state) {
        router.changeDefaultRoute()
        this.model = new TaskListModel()
        this.view = new TaskListView(state)
        this.controller = new TaskListController(this.model, this.view)
    }
}

export default TaskList



