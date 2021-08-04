import Observer from "../Observer";

class ListModel {
    constructor() {
        this.defaultContainersAmount = 6
        this.containers = []
        this.createContainers()
        this.listChangedEvent = new Observer();
    }

    save(containers) {
        this.listChangedEvent.notify(containers)
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
        this.save(this.containers)
    }

}

export default ListModel