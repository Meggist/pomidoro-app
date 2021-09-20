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
            const allDoneTasks = Array.from(document.querySelectorAll('.done')).map(task => task.id)
            if (typeof this.task === 'string') {
                const id = this.task
                this.task = {}
                this.task.isDeleting = true
                this.task.id = id
                eventBus.publish('renderModal', this.task)
                return
            }
            this.task.doneTaskIds = this.task.filter(id => allDoneTasks.includes(id))
            this.task.toDoTaskIds = this.task.filter(id => !allDoneTasks.includes(id))
            this.task.isDeleting = true
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

    deleteTask = tasks => {
        if (typeof tasks.id === 'string') {
            dataBase.deleteDBField(`taskCollection/${tasks.id}`)
                .then(() => eventBus.publish('updateTaskCollection'))
        } else {
            dataBase.getFieldFromDB('taskCollection').then(data => {
                const filtered = Object.keys(data)
                    .filter(key => !tasks.toDoTaskIds.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = data[key];
                        if (tasks.doneTaskIds.includes(key)) {
                            obj[key].isRemoved = true
                        }
                        return obj;
                    }, {})
                dataBase.deleteDBField('taskCollection').then(() => {
                    dataBase.updateField('taskCollection', filtered)
                        .then(() => eventBus.publish('updateTaskCollection'))
                })
            })
        }
    }
}

export default ModalModel