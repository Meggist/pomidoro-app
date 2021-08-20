import {eventBus} from "../../eventBus";
import {dataBase} from "../../firebase";

class ModalModel {
    constructor(state) {
        this.state = state
        this.render(this.state)
        eventBus.subscribe('acceptModal', this.updateDB)
    }

    render = (state) => {

    }

    updateDB = (data) => {
        dataBase.db.ref('taskCollection').orderByKey().once("value")
            .then(snapshot => {
                if (snapshot.exists()) {
                    this.taskCollection = Object.values(snapshot.val())
                    this.taskId = this.taskCollection[this.taskCollection.length - 1].id
                    ++this.taskId
                    dataBase.insertDataToDB(`taskCollection/${this.taskId}`, data)
                } else {
                    dataBase.insertDataToDB(`taskCollection/${this.taskId}`, data)
                    ++this.taskId
                }
            })
            .then(() => eventBus.publish('updateTaskCollection'))
    }
}

export default ModalModel