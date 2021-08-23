import {eventBus} from "../../eventBus";

class GlobalListController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('renderGlobalTasks', this.render)
        this.filterCollection()
    }

    render = tasks => this.view.render(tasks)

    filterCollection = () => this.model.render()
}

export default GlobalListController