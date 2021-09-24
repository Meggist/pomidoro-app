import {eventBus} from "../../eventBus";

class ReportsTableController {
    constructor(model, view) {
        this.model = model
        this.view = view

        eventBus.subscribe('getReportsData', this.render)
        this.filterData()
    }

    render = data => {
        this.view.append()
        this.view.appendHighChart(data)
    }
    filterData = () => this.model.getData()
}

export default ReportsTableController