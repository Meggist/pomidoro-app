import {eventBus} from "../../eventBus";

class ModalController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('renderAddModal',this.renderAdd)
        this.getModalData()
    }

    renderAdd = (data) => {

        eventBus.findEventCallbacksPair('renderAddModal').callbacks.pop()
        this.view.append(data)
    }

    getModalData = () => {
        this.model.render(this.model.state)
    }

}

export default ModalController