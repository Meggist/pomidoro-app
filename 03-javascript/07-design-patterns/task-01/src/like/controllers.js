import {eventBus} from "../EventBus";

class LikeController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe("increaseLike", this.model.increaseLike);

        this.view.createLikeBlocks(this.model.likes)
    }
}

export default LikeController



