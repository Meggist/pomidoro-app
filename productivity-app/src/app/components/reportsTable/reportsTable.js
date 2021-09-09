import ReportsTableModel from "./reportsTableModel";
import ReportsTableView from "./reportsTableView";
import ReportsTableController from "./reportsTableController";

class ReportsTable {
    constructor(period, type) {
        this.model = new ReportsTableModel(period, type)
        this.view = new ReportsTableView(period, type)
        this.controller = new ReportsTableController(this.model, this.view)
    }
}

export default ReportsTable