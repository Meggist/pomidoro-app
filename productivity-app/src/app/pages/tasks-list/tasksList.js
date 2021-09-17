import TaskListView from "./taskListView";
import TaskListController from "./taskListController";
import {router} from "../../router";


class TaskList {
    constructor(state) {
        router.changeDefaultRoute()
        this.view = new TaskListView(state)
        this.controller = new TaskListController(this.view)
        $('#root').notifyTest().checkChain()
    }
}

export default TaskList



