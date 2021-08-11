import {eventBus} from "../EventBus";

class LikeView {
    constructor(model) {
        this.model = model
        this.main = document.getElementsByClassName('main')[0]
        eventBus.subscribe('updateLikes',this.createLikeBlocks);

        this.main.addEventListener ('click', event => {
                if (event.target.className === 'like-button'){
                    const id = Number(event.target.parentElement.parentElement.id)
                    eventBus.publish("increaseLike", id)
                }
            })

    }

    createLikeBlocks = (likes) => {
        const htmlContainers = Array.from(document.getElementsByClassName('block'))
        htmlContainers.forEach(e => e.parentNode.removeChild(e))
        likes.forEach((element, index) => {
            const block = document.createElement('div')
            block.classList.add('block')
            const button = document.createElement('button')
            const label = document.createElement('label')
            label.textContent = `${likes[index].value} likes`
            label.classList.add('label')
            button.classList.add("like-button")
            button.textContent = "👍"
            block.appendChild(button)
            block.appendChild(label)
            const container = document.getElementById(element.id + '')
            container.appendChild(block)
        });
    }
}
export default LikeView