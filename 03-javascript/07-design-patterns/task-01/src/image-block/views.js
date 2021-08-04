import ImageModel from './models'
import {eventBus} from "../EventBus";

class ImageView {
    constructor(model) {
        this.model = model
        this.root = document.getElementById('root')
        this.main = document.getElementsByClassName('main')[0]
        this.newCopy = document.createElement('div')
        this.createModalWindow()
        this.modalId = null
        this.currentContainer = null

        eventBus.subscribe('selectContainer', () => {
            if (this.modalId !== null && this.currentContainer !== null) {
            this.currentContainer = document.getElementById(this.modalId)
            this.newCopy.innerHTML = ''
            this.createCopy(this.currentContainer)
            }
        })

        this.main.addEventListener('click', ({target}) => {
            if (target.className === 'img'){
                this.modalId = target.parentNode.id
                this.currentContainer = document.getElementById(this.modalId)
                this.modalWindow.style.display = 'flex'
                this.createCopy(this.currentContainer)
            }
        })
        this.modalWindow.addEventListener('click', ({target}) => {
            if (target.id === 'close') {
                this.modalWindow.style.display = 'none'
                this.newCopy.innerHTML = ''
                this.modalId = null
                this.currentContainer = null
            }

            if (target.id === 'prev') {
                if (this.currentContainer.previousSibling !== null) {
                    this.currentContainer = this.currentContainer.previousSibling
                    this.modalId = this.currentContainer.id
                    this.newCopy.innerHTML = ''
                    this.createCopy(this.currentContainer)
                }
            }

            if (target.id === 'next') {
                if (this.currentContainer.nextSibling !== null) {
                    this.currentContainer = this.currentContainer.nextSibling
                    this.modalId = this.currentContainer.id
                    this.newCopy.innerHTML = ''
                    this.createCopy(this.currentContainer)
                }
            }

            if (target.className === 'like-button'){
                eventBus.publish("increaseLike", Number(this.modalId))
            }
        })
    }

    createCopy = (container) => {
        this.newCopy.innerHTML = container.innerHTML
    }

    createImages = () => {
        this.model.images.forEach((element, index) => {
            const img = document.createElement('img')
            img.classList.add('img')
            img.src = element.src
            const container = document.getElementById(element.id + '')
            container.appendChild(img)
        });
    }

    createModalWindow = () => {
        this.modalWindow = document.createElement('div')
        this.root.appendChild(this.modalWindow)
        this.modalWindow.classList.add('modal-window')
        const closeButton = document.createElement('button')
        const prevButton = document.createElement('button')
        const nextButton = document.createElement('button')
        closeButton.textContent = 'X'
        prevButton.textContent = 'prev'
        nextButton.textContent = 'next'
        closeButton.id = 'close'
        prevButton.id = 'prev'
        nextButton.id = 'next'
        this.modalWindow.appendChild(closeButton)
        this.modalWindow.appendChild(prevButton)
        this.modalWindow.appendChild(nextButton)
        this.modalWindow.appendChild(this.newCopy)
    }

}

export default ImageView