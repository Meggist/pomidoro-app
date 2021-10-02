import {eventBus} from "../../eventBus";
import Modal from "../modal/modal";
import {dataBase} from "../../firebase";

class GlobalListController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('renderGlobalTasks', this.render)
        eventBus.subscribe('renderGlobalList', this.append)
        eventBus.subscribe('editGlobalTask', this.editTask)
        eventBus.subscribe('deleteGlobalTask', this.deleteTask)
        eventBus.subscribe('moveTaskToDailyTask', this.moveTask)
        this.filterTasks()
    }

    render = tasks => {
        this.tasks = tasks
        this.view.render(tasks)
    }


    filterTasks = () => this.model.render()

    append = () => this.view.append()

    editTask = id => {
        let editedTask
        Object.values(this.tasks).forEach(item => item.forEach(item => {
            if (item.model.id === id) {
                editedTask = item
            }
        }))
        new Modal('edit', editedTask)
    }

    deleteTask = id => {
        new Modal('delete', id)
    }

    moveTask = id => {
        if (this.model.dailyTasksAmount >= 5) {
            $('main').notification({type: 'error', text: 'Unable to move to the daily task list. Try again later'})
            return
        }
        let editedTask
        Object.values(this.tasks).forEach(item => item.forEach(item => {
            if (item.model.id === id) {
                editedTask = item
            }
        }))
        editedTask.model.status.GLOBAL_LIST = false
        editedTask.model.status.DAILY_LIST = true
        const taskData = Object.assign({}, editedTask.model)
        delete taskData.id
        dataBase.updateField(`taskCollection/${id}`, taskData)
            .then(() => {
                eventBus.publish('updateTaskCollection')
                $('main').notification({type: 'info', text: 'You task was moved to the daily task list'})
            })
    }

    bindAllEvents = () => {
        this.view.globalList.addEventListener('click', this.tabHandler)
        this.view.bindAllEvents()
    }

    tabHandler = ({target}) => {
        if (target.className === 'global-list__tab') {
            const tabs = document.querySelectorAll('.global-list__tab')
            tabs.forEach(item => item.classList.remove('active'))
            target.classList.add('active')
            this.view.render(this.tasks)
        }
    }

}

export default GlobalListController