import {eventBus} from "../../eventBus";

class ModalController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('renderModal', this.render)
        this.getModalData()
    }

    render = data => {
        this.view.append(data)
    }

    getModalData = () => {
        this.model.render()
    }
}

export default ModalController