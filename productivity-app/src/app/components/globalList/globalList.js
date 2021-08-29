import GlobalListModel from "./globalListModel"
import GlobalListView from "./globalListView"
import GlobalListController from "./globalListController"

class GlobalList {
    constructor(taskCollection) {
        this.model = new GlobalListModel(taskCollection)
        this.view = new GlobalListView()
        this.controller = new GlobalListController(this.model, this.view)
    }

}

export default GlobalList