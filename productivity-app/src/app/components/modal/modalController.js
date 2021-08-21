import {eventBus} from "../../eventBus";

class ModalController {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.render(this.model.data)
    }

    render = (data) => {
        this.view.append(data)
    }
}

export default ModalController