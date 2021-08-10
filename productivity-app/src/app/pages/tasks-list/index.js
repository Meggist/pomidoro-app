//export { TaskList } from './task-list';

require("babel-polyfill")

window.addEventListener('task-list_render', async(event) => {
    event.detail.handler('task-list', 'Daily task list').then(() => {
        require('../../components/header/header');
        console.log('render call')
    })
})