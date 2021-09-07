import Header from "../../components/header/header";
import {eventBus} from "../../eventBus";
import TaskCollection from "../../components/taskCollection/taskCollection";
import DailyList from "../../components/dailyList/dailyList";
import GlobalList from "../../components/globalList/globalList";

class TaskListController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('finishCollectionRender', this.createLists)
        this.taskCollection = new TaskCollection()
    }

    createLists = taskCollection => {
        this.render(taskCollection)
        const dailyList = new DailyList(taskCollection)
        const globalList = new GlobalList(taskCollection)
        this.header.controller.clickSelectedTasks()
    }

    render = taskCollection => {
        if (!document.querySelector('header')) {
            this.view.append()
            this.header = new Header('Daily Task List')
            this.view.displayPage(taskCollection)
        } else {
            this.view.displayLists(taskCollection)
        }
    }
}

export default TaskListController
