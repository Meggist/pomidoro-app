import template from './modal_tmpl.hbs'
import {eventBus} from "../../eventBus";

class ModalView {
    constructor() {
        this.modalWrapper = document.querySelector('.modal-wrapper')
        this.taskId = 1
    }

    append = (data) => {
        this.modalWrapper.innerHTML = template(data)
        this.getTargets()
        this.bindAllEvents()
    }

    getTargets = () => {
        this.modalWindow = document.querySelector('.modal-window')
        this.estimations = Array.from(document.querySelectorAll('.modal-estimations > *'))
        this.categories = Array.from(document.querySelectorAll('.modal-category'))
        this.closeModalButton = document.getElementById('closeModalButton')
        this.createTaskButton = document.getElementById('createTaskButton')
        this.links = this.estimations.map(item => item.src)
    }

    bindAllEvents = () => {
        this.bindCategoriesEvents()
        this.bindEstimationsEvents()
        this.bindPrioritiesEvents()
        this.bindCloseEvent()
        this.bindAcceptEvent()
    }

    closeModalWindow = () => {
        document.querySelector('.modal-wrapper').classList.add('hidden')
        document.querySelector('.header').classList.remove('hidden')
        document.querySelector('.main').classList.remove('modal-display')
    }

    changePoint = (field, isSelected, type) => {
        const cycle = field.querySelector('.modal__empty-cycle-category')
        const point = field.querySelector('.modal-point')
        const text = field.querySelector('.modal-category__text')

        if (isSelected) {
            cycle.classList.add('hidden')
            point.classList.remove('hidden')
            text.classList.remove('white-color')
            field.classList.remove(`selected-${type}`)
        } else {
            cycle.classList.remove('hidden')
            point.classList.add('hidden')
            text.classList.add('white-color')
            field.classList.add(`selected-${type}`)
        }
    }

    choosePoint = (item, type) => {
        const selectedPoint = this.modalWindow.querySelector(`.selected-${type}`)
        this.changePoint(selectedPoint, true, type)
        this.changePoint(item, false, type)
    }

    chooseEstimate = (item, index, nextItem) => {
        this.estimations.slice(0, nextItem).forEach(item => item.src = "../images/fill tomato.svg")
        this.estimations.slice(nextItem, this.estimations.length).forEach(item => item.src = "../images/empty-tomato.svg")
    }

    bindEstimationsEvents = () => {
        this.estimations.forEach((item, index) => {
            const nextItem = index + 1
            item.onclick = item.onmouseover = () => this.chooseEstimate(item, index, nextItem)
            item.onmouseout = () => this.estimations.forEach((item, index) => item.src = this.links[index])
        })
    }

    bindCategoriesEvents = () => {
        this.categories.forEach(item => item.onclick = () => this.choosePoint(item, 'category'))
    }

    bindPrioritiesEvents = () => {
        this.priorities = Array.from(document.querySelectorAll('.modal-priority'))
        this.priorities.forEach(item => item.onclick = () => this.choosePoint(item, 'priority'))
    }

    bindCloseEvent = () => this.closeModalButton.onclick = this.closeModalWindow

    bindAcceptEvent = () => this.createTaskButton.onclick = () => {
        eventBus.publish('acceptModal', this.selectModalInputsValue())
        this.closeModalWindow()
    }

    selectModalInputsValue = () => {
        return {
            id: this.taskId.toString(),
            title: document.getElementById('modalInputTitle').value,
            description: document.getElementById('modalInputDescription').value,
            categoryId: this.categories.find(item => item.classList.contains('selected-category'))
                .querySelector('.modal-category__text').textContent.toLowerCase(),
            priority: 1 + this.priorities.slice().reverse().findIndex(item => item.classList.contains('selected-priority')),
            estimation: 1 + this.links.map(item => {
                const imgNames = item.split('/')
                return imgNames[imgNames.length - 1]
            }).lastIndexOf('fill%20tomato.svg'),

            deadlineDate: new Date(document.getElementById('modalInputDate').value),
            status: {
                GLOBAL_LIST: true,
                DAILY_LIST: false,
                ACTIVE: true,
                COMPLETED: false
            },
            createDate: new Date(Date.now()),
            completedCount: 0,
            failedPomodoros: 0,
            completeDate: ''
        }
    }

}

export default ModalView