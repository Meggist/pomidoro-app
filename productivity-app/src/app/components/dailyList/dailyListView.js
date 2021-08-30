import {eventBus} from "../../eventBus";
import GlobalListView from "../globalList/globalListView";

class DailyListView extends GlobalListView{
    constructor() {
        super()
        this.dailyTaskList = document.querySelector('.tasks').firstElementChild
    }

    render = tasks => {
        this.dailyTaskList.innerHTML = tasks.map(tasks => tasks.view.task).join('')
        this.bindAllEvents()
    }

    bindAllEvents = () => {
        if (this.dailyTaskList.classList.contains('binded') !== true) {
            this.bindEditEvent(this.dailyTaskList, 'Daily')
            this.bindPriorityHover(this.dailyTaskList)
            this.dailyTaskList.classList.add('binded')
        }
    }
}

export default DailyListView