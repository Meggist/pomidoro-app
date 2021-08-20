import {eventBus} from "../../eventBus";

class TaskCollectionView {
    constructor() {
    }

    render = (tasks) => {
        this.tasks = tasks.map(item => item.view.task)
        eventBus.publish('renderTasks', this.tasks)
    }

    appendHtml = (content, target) => {
        target.innerHTML = ''
        content.forEach(item => target.innerHTML += item)
    }
}

export default TaskCollectionView