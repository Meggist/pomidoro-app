//export { TaskList } from './task-list';

require("babel-polyfill");

window.addEventListener('reports_render', async(event) => {
    event.detail.handler('reports', 'Reports').then(() => {
        require('../../components/header/header');
        console.log('render call')
    })
})