import {listController} from "../app";
import {eventBus} from "../EventBus";

class LikeModel {
    constructor() {
        this.likes = []
        this.createLikes()
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
        eventBus.publish('updateLikes', this.likes)
        eventBus.publish('selectContainer')
    }

}
export default LikeModel