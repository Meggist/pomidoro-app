import {eventBus} from "../../eventBus";
import {dataBase} from "../../firebase";

class ModalModel {
    constructor(state, task) {
        this.state = state
        this.task = task
        eventBus.subscribe('acceptAddModal', this.pushTask)
        eventBus.subscribe('acceptEditModal', this.editTask)
        eventBus.subscribe('acceptDeleteModal', this.deleteTask)
    }

    render = () => {
        if (this.state === 'add') {
            eventBus.publish('renderModal', this.task)
            return
        }

        if (this.state === 'edit') {
            eventBus.publish('renderModal', this.task.model)
            return
        }

        if (this.state === 'delete') {
            const ids = this.task
            this.task = {}
            this.task.isDeleting = true
            typeof ids === 'string' ? this.task.ids = ids : this.task.ids = [...ids]
            eventBus.publish('renderModal', this.task)
        }
    }

    pushTask = taskData => {
        dataBase.db.ref('taskCollection').push(taskData)
            .then(() => eventBus.publish('updateTaskCollection'))
    }

    editTask = taskData => {
        const id = taskData.id
        delete taskData.id
        dataBase.db.ref(`taskCollection/${id}`).update(taskData)
            .then(() => eventBus.publish('updateTaskCollection'))
    }

    deleteTask = ids => {
        if (typeof ids === 'string') {
            dataBase.deleteDBField(`taskCollection/${ids}`)
                .then(() => eventBus.publish('updateTaskCollection'))
        }
    }
}

export default ModalModel