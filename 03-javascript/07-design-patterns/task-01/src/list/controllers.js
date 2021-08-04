import {eventBus} from "../EventBus";

class ListController {
    constructor(model, view) {
        this.model = model
        this.view = view

        eventBus.subscribe('updateContainers', this.model.updateContainers)

        this.view.createContainer(this.model.containers)
    }

}

export default ListController