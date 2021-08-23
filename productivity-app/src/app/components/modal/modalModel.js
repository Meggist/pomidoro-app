import {eventBus} from "../../eventBus";
import {dataBase} from "../../firebase";

class ModalModel {
    constructor(state) {
        this.state = state
        eventBus.subscribe('acceptModal', this.updateDB)
    }

    render = (state) => {
        if (state === 'add') {
            eventBus.publish('renderAddModal')
        }
    }

    updateDB = (taskData) => {

        dataBase.db.ref('taskCollection').push(taskData)
            .then(() => eventBus.publish('updateTaskCollection'))
    }

}

export default ModalModel