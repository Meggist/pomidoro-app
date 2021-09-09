import ModalModel from "./modalModel";
import ModalView from "./modalView";
import ModalController from "./modalController";

class Modal {
    constructor(state, task) {
        this.model = new ModalModel(state, task)
        this.view = new ModalView()
        this.controller = new ModalController(this.model, this.view)
    }
}

export default Modal













