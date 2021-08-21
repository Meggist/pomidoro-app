import {eventBus} from "../../eventBus";
import {dataBase} from "../../firebase";

class ModalModel {
    constructor(state) {
        this.state = state
        this.render(this.state)
        eventBus.subscribe('acceptModal', this.updateDB)
        this.startId = 1
    }

    render = (state) => {

    }

    updateDB = (data) => {
        dataBase.db.ref('taskCollection').orderByKey().once("value")
            .then(snapshot => {
                if (snapshot.exists()) {
                    this.taskCollection = Object.values(snapshot.val())
                    data.id = this.taskCollection[this.taskCollection.length - 1].id + 1
                    dataBase.insertDataToDB(`taskCollection/${data.id}`, data)
                } else {
                    data.id = this.startId
                    dataBase.insertDataToDB(`taskCollection/${data.id}`, data)
                }
            })
            .then(() => eventBus.publish('updateTaskCollection'))
    }
}

export default ModalModel