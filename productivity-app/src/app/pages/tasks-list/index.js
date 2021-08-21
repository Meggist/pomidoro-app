import TaskCollection from "../../components/taskCollection/taskCollection";
import Header from "../../components/header/header";

window.addEventListener('task-list_render', async(event) => {
    event.detail.handler('task-list', 'Daily task list').then(() => {
        const header = new Header('Daily Task List')
        require('./tasks-list')
        require('../../components/modal/modal')
        const taskCollection = new TaskCollection()
    })
})