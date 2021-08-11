import {eventBus} from "../EventBus";

class ImageController {
    constructor(model, view) {
        this.model = model
        this.view = view

        eventBus.subscribe('updateImages', this.view.createImages)
        this.view.createImages()
    }
}

export default ImageController