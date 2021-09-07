import {dataBase} from "../../firebase";
import {eventBus} from "../../eventBus";

class TaskListModel {
    /*
    checkDB = () => {
        dataBase.getFieldFromDB('taskCollection')
            .then(data => data ? eventBus.publish('finishCheckingDB', true) :
                eventBus.publish('finishCheckingDB', false))
    }
     */
}

export default TaskListModel