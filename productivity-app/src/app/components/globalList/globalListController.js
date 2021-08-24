import {eventBus} from "../../eventBus";

class GlobalListController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('renderGlobalTasks', this.render)
        eventBus.subscribe('renderGlobalList', this.append)
        this.filterTasks()
    }

    render = tasks => {
        eventBus.findEventCallbacksPair('renderGlobalTasks').callbacks.pop()
        this.view.render(tasks)
    }
    filterTasks = () => this.model.render()
    append = (template) => {
        eventBus.findEventCallbacksPair('renderGlobalList').callbacks.pop()
        this.view.append(template)
    }


}

export default GlobalListController