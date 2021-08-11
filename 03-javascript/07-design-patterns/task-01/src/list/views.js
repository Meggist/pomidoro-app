import {eventBus} from "../EventBus";

class ListView {
    constructor(model) {
        this.model = model
        this.root = document.getElementById('root')
        this.createMainBlock()
        this.main = document.getElementsByClassName('main')[0]
        eventBus.subscribe('updateBlocks', this.createContainer)
    }

    createMainBlock = () => {
        const main = document.createElement('main')
        main.classList.add('main')
        this.root.appendChild(main);
    }

    createContainer = (containers) => {
        const htmlContainers = Array.from(document.getElementsByClassName('container'))
        htmlContainers.forEach(item => this.main.removeChild(item))
        containers.forEach(element => {
            const block = document.createElement('div')
            block.classList.add('container')
            block.id = element.id
            this.main.appendChild(block)
        });
    }
}

export default ListView