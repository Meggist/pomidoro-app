import DailyListModel from "./dailyListModel"
import DailyListView from "./dailyListView"
import DailyListController from "./dailyListController"

class DailyList {
    constructor(taskCollection) {
        this.model = new DailyListModel(taskCollection)
        this.view = new DailyListView()
        this.controller = new DailyListController(this.model, this.view)
    }
}

export default DailyList