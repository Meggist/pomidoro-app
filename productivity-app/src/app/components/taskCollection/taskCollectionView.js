import {eventBus} from "../../eventBus";

class TaskCollectionView {
    constructor() {
        this.tasksSection = document.querySelector('.tasks')
    }

    render = (tasks) => {
        this.htmlTasks = tasks.map(item => item.view.task)
        eventBus.publish('renderTasks')
    }

    appendHtml = (content, target) => {
        target.innerHTML = ''
        content.forEach(item => target.innerHTML += item)
        //this.bindEvents()
    }

    bindEvents = () => {
        this.bindPriorityHover()
    }

    bindPriorityHover = () => {
        this.tasksSection.addEventListener('mouseover', ({target}) => {
            if (target.classList.contains('tasks__tomato')) {
                target.parentNode.querySelector('.tasks__num').classList.add('hidden')
                target.parentNode.querySelector('.icon-timer').classList.remove('hidden')
                target.parentNode.querySelector('.icon-tomato').classList.add('hidden')
            }

        })

        this.tasksSection.addEventListener('mouseout', ({target}) => {
            if (target.classList.contains('tasks__tomato')) {
                target.parentNode.querySelector('.tasks__num').classList.remove('hidden')
                target.parentNode.querySelector('.icon-timer').classList.add('hidden')
                target.parentNode.querySelector('.icon-tomato').classList.remove('hidden')
            }
        })
    }


}

export default TaskCollectionView