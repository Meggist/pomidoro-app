import {listController} from "../app";
import Observer from "../Observer";
import {eventBus} from "../EventBus";

class LikeModel {
    constructor() {
        this.likes = []
        this.createLikes()
        this.listChangedEvent = new Observer();
    }

    save(likes) {
        this.listChangedEvent.notify(likes)
    }

    createLikes() {
        this.likes = listController.model.containers.map((item, index) => {
            return {
                value: 0,
                id: index
            }
        })
    }

    increaseLike = (id) => {
        let index = this.likes.findIndex(element => element.id === id)
        ++this.likes[index].value
        this.likes.sort((a,b) => b.value - a.value)
        eventBus.publish('updateContainers', this.likes)
        eventBus.publish('updateImages')
        this.save(this.likes)
        eventBus.publish('selectContainer')
    }

}
export default LikeModel