//export { TaskList } from './task-list';

require("babel-polyfill")

window.addEventListener('task-list_render', async(event) => {
    event.detail.handler('task-list', 'Daily task list').then(() => {
        require('../../components/header/header')
        require('./tasks-list')
        require('../../components/modal/modal')
        require('../../components/taskItem/taskItemController')
        require('../../components/taskCollection/taskCollectionController')
        console.log('render call')
    })
})