import TaskCollection from "../../components/taskCollection/taskCollection";
import Header from "../../components/header/header";
import {eventBus} from "../../eventBus";
import DailyList from "../../components/dailyList/dailyList";
import GlobalList from "../../components/globalList/globalList";
import template from './task-list.hbs'

class TaskList {
    constructor() {
        document.body.innerHTML = template()
        this.header = new Header('Daily Task List')
        eventBus.subscribe('finishCollectionRender', taskCollection => {
            const dailyList = new DailyList(taskCollection)
            const globalList = new GlobalList(taskCollection)
        })
        this.taskCollection = new TaskCollection()
    }
}

export default TaskList



