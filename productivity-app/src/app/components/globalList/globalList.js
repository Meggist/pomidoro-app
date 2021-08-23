import GlobalListModel from "./globalListModel";
import GlobalListView from "./globalListView";
import GlobalListController from "./globalListController";
import {eventBus} from "../../eventBus";

class GlobalList {
    constructor(taskCollection) {
        this.taskCollection = taskCollection
        this.model = new GlobalListModel(this.taskCollection)
        this.view = new GlobalListView(taskCollection)
        this.controller = new GlobalListController(this.model, this.view)
    }

}

export default GlobalList