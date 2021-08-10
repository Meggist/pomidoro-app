//export { TaskList } from './task-list';
require("babel-polyfill")

window.addEventListener('settings_render', async(event) => {
    event.detail.handler('settings', 'Settings').then(() => {
        require('../../components/header/header');
        require('./settings')
        console.log('render call')
    })
})