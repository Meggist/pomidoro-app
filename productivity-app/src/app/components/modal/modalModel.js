import {eventBus} from "../../eventBus";
import {dataBase} from "../../firebase";

class ModalModel {
    constructor(state, task) {
        this.state = state
        this.task = task
        eventBus.subscribe('acceptAddModal', this.pushTask)
        eventBus.subscribe('acceptEditModal', this.editTask)
    }

    render = () => {
        if (this.state === 'add') {
            eventBus.publish('renderModal')
            console.log('add: ' + this.state)
            return
        }

        if (this.state === 'edit') {
            console.log('edit: ' + this.state)
            eventBus.publish('renderModal', this.task.model)
        }
    }

    pushTask = (taskData) => {
        dataBase.db.ref('taskCollection').push(taskData)
            .then(() => eventBus.publish('updateTaskCollection'))
    }

    editTask = (taskData) => {
        const id = taskData.id
        delete taskData.id
        dataBase.db.ref(`taskCollection/${id}`).update(taskData)
            .then(() => eventBus.publish('updateTaskCollection'))
    }

}

export default ModalModel