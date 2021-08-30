import TaskCollection from "../../components/taskCollection/taskCollection";
import Header from "../../components/header/header";
import GlobalList from "../../components/globalList/globalList";
import {eventBus} from "../../eventBus";
import DailyList from "../../components/dailyList/dailyList";

window.addEventListener('task-list_render', async(event) => {
    event.detail.handler('task-list', 'Daily task list').then(() => {
        const header = new Header('Daily Task List')
        eventBus.subscribe('finishCollectionRender', taskCollection => {
            new GlobalList(taskCollection)
            new DailyList(taskCollection)
        })
        const taskCollection = new TaskCollection()
    })
})

