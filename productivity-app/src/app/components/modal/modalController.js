import {eventBus} from "../../eventBus";

class ModalController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('renderAddModal',this.renderAdd)
        //eventBus.subscribe('renderEditModal', this.renderEdit)
        this.getModalData()
    }

    renderAdd = (data) => {
        this.view.append(data)
    }

    renderEdit = () => {

    }

    getModalData = () => {
        this.model.render(this.model.state)
    }

}

export default ModalController