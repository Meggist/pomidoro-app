import TaskCollection from "../../components/taskCollection/taskCollection";

window.addEventListener('task-list_render', async(event) => {
    event.detail.handler('task-list', 'Daily task list').then(() => {
        require('../../components/header/header')
        require('./tasks-list')
        require('../../components/modal/modal')
        const taskCollection = new TaskCollection()
    })
})