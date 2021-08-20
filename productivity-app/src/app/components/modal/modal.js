import ModalModel from "./modalModel";
import ModalView from "./modalView";
import ModalController from "./modalController";

class Modal {
    constructor(state) {
        this.model = new ModalModel(state)
        this.view = new ModalView()
        this.controller = new ModalController(this.model, this.view)
    }
}

export default Modal













