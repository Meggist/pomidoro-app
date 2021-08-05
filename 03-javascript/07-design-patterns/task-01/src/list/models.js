import {eventBus} from "../EventBus";

class ListModel {
    constructor() {
        this.defaultContainersAmount = 6
        this.containers = []
        this.createContainers()
    }

    createContainers = () => {
        for (let i = 0; i < this.defaultContainersAmount; i++) {
            this.containers.push({id:i})
        }
    }

    updateContainers = (likes) => {
        this.containers = this.containers.map((item, index) => {
            return {id: likes[index].id}
        })
        eventBus.publish('updateBlocks', this.containers)
    }

}

export default ListModel