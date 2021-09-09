import template from './modal_tmpl.hbs'
import {eventBus} from "../../eventBus"

class ModalView {
    constructor() {
        this.modalWrapper = document.querySelector('.modal-wrapper')
    }

    append = data => {
        if (data.deadlineDate) {
            data.deadlineDate = this.convertDate(data.deadlineDate)
        }
        if (!data.isDeleting) {
            this.insertCategories(data)
            this.insertEstimations(data)
            this.insertPriorities(data)
        }
        this.modalWrapper.innerHTML = template(data)
        this.getTargets()
        this.displayModalWindow(data)
        this.bindAllEvents(data)
        delete data.categories
        delete data.estimations
        delete data.priorities
    }

    insertEstimations = data => {
        let estimationsIndex
        data.estimation ? estimationsIndex = data.estimation : estimationsIndex = 3
        data.estimations = new Array(5)
        data.estimations.fill(`<img src="../images/fill-tomato.svg" alt="estimation">`, 0, estimationsIndex)
        data.estimations.fill(`<img src="../images/empty-tomato.svg" alt="estimation">`, estimationsIndex)
    }

    convertDate = date => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2)
            month = '0' + month
        if (day.length < 2)
            day = '0' + day

        return [year, month, day].join('-')
    }

    insertCategories = data => {
        let isEditModal
        if (data.deadlineDate) {
            isEditModal = true
        }
        data.categories = {
            work: {
                point: 'hidden',
            },
            education: {
                cycle: 'hidden',
            },
            hobby: {
                cycle: 'hidden',
            },
            sport: {
                cycle: 'hidden',
            },
            other: {
                cycle: 'hidden',
            }
        }
        if (isEditModal) {
            data.categories.work.point = ''
            data.categories.work.cycle = 'hidden'
            data.categories[data.categoryId].point = 'hidden'
            data.categories[data.categoryId].cycle = ''
        }
    }

    insertPriorities = data => {
        let isEditModal
        if (data.deadlineDate) {
            isEditModal = true
        }
        data.priorities = {
            urgent: {
                point: 'hidden',
            },
            low: {
                cycle: 'hidden',
            },
            middle: {
                cycle: 'hidden',
            },
            high: {
                cycle: 'hidden',
            }
        }
        if (isEditModal) {
            data.priorities.urgent.point = ''
            data.priorities.urgent.cycle = 'hidden'
            data.priorities[this.getPriority(data.priority)].point = 'hidden'
            data.priorities[this.getPriority(data.priority)].cycle = ''
        }
    }

    getPriority = index => ({
        1: 'low',
        2: 'middle',
        3: 'high',
        4: 'urgent'
    })[index]

    displayDate = () => {
        this.dateInput.valueAsDate = new Date()
    }

    displayModalWindow = data => {
        document.querySelector('.modal-wrapper').classList.remove('hidden')
        document.querySelector('.header').classList.add('hidden')
        document.querySelector('.main').classList.add('modal-display')


        if (data.isDeleting) {
            this.modalWrapper.querySelector('.modal-title span').textContent = 'Remove Task'
            this.modalWrapper.querySelector('.icon-check').classList.add('hidden')
            this.modalWrapper.querySelector('.modal-form').classList.add('hidden')
            this.modalWrapper.querySelector('.modal__edit').classList.remove('hidden')
            return
        }

        if (data.deadlineDate) {
            this.modalWrapper.querySelector('.modal-title span').textContent = 'Edit Task'
            this.categories.forEach(item => {
                if (item.querySelector('.modal-category__text').textContent.toLowerCase() === data.categoryId) {
                    item.classList.add('selected-category')
                }
            })
            this.priorities = this.priorities.reverse()
            this.priorities[data.priority - 1].classList.add('selected-priority')
        } else {
            this.priorities = this.priorities.reverse()
            this.categories[0].classList.add('selected-category')
            this.priorities[3].classList.add('selected-priority')
        }
    }

    getTargets = () => {
        this.cancelButton = this.modalWrapper.querySelector('.modal__cancel')
        this.removeButton = this.modalWrapper.querySelector('.modal__remove')
        this.modalWindow = document.querySelector('.modal-window')
        this.dateInput = document.getElementById('modalInputDate')
        this.estimations = Array.from(document.querySelectorAll('.modal-estimations > *'))
        this.categories = Array.from(document.querySelectorAll('.modal-category'))
        this.priorities = Array.from(document.querySelectorAll('.modal-priority'))
        this.closeModalButton = document.getElementById('closeModalButton')
        this.createTaskButton = document.getElementById('createTaskButton')
        this.links = this.estimations.map(item => item.src)
    }

    bindAllEvents = data => {
        this.bindCategoriesEvents()
        this.bindEstimationsEvents()
        this.bindPrioritiesEvents()
        this.bindCloseEvent()
        this.bindAcceptEvent(data)
        if (!data.deadlineDate) {
            this.displayDate()
        }
    }

    closeModalWindow = () => {
        document.querySelector('.modal-wrapper').classList.add('hidden')
        document.querySelector('.header').classList.remove('hidden')
        document.querySelector('.main').classList.remove('modal-display')
        this.modalWrapper.innerHTML = ''
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
        this.links = this.estimations.map(item => item.src)
        this.estimations.slice(0, nextItem).forEach(item => item.src = "../images/fill-tomato.svg")
        this.estimations.slice(nextItem, this.estimations.length).forEach(item => item.src = "../images/empty-tomato.svg")
    }

    bindEstimationsEvents = () => {
        this.estimations.forEach((item, index) => {
            const nextItem = index + 1
            item.onclick = () => this.chooseEstimate(item, index, nextItem)
            item.onmouseover = () => this.chooseEstimate(item, index, nextItem)
            item.onmouseout = () => this.estimations.forEach((item, index) => item.src = this.links[index])
        })
    }

    bindCategoriesEvents = () => {
        this.categories.forEach(item => item.onclick = () => this.choosePoint(item, 'category'))
    }

    bindPrioritiesEvents = () => {
        this.priorities.forEach(item => item.onclick = () => this.choosePoint(item, 'priority'))
    }

    bindCloseEvent = () => this.closeModalButton.onclick = this.cancelButton.onclick= this.closeModalWindow

    bindAcceptEvent = data => this.createTaskButton.onclick = this.removeButton.onclick = () => {
        if (data.isDeleting) {
            eventBus.publish('cleanBasket')
            eventBus.publish('acceptDeleteModal', data.ids)
            this.closeModalWindow()
            return
        }
        const values = this.selectModalInputsValue()
        if (!data.deadlineDate) {
            values.status = {
                GLOBAL_LIST: true,
                DAILY_LIST: false,
                ACTIVE: false,
                COMPLETED: false
            }
            eventBus.publish('acceptAddModal', values)
            this.closeModalWindow()
            console.log("Task added successfully")
            return
        }

        if (data.deadlineDate) {
            values.id = data.id
            eventBus.publish('acceptEditModal', values)
            console.log("Task edited successfully")
            this.closeModalWindow()
        }
    }

    selectModalInputsValue = () => {
        return {
            title: document.getElementById('modalInputTitle').value,
            description: document.getElementById('modalInputDescription').value,
            categoryId: this.categories.find(item => item.classList.contains('selected-category'))
                .querySelector('.modal-category__text').textContent.toLowerCase(),
            priority: 1 + this.priorities.slice().findIndex(item => item.classList.contains('selected-priority')),
            estimation: 1 + this.links.map(item => {
                const imgNames = item.split('/')
                return imgNames[imgNames.length - 1]
            }).lastIndexOf('fill-tomato.svg'),
            deadlineDate: new Date(this.dateInput.value).toDateString(),
            createDate: new Date(Date.now()).toDateString(),
            completedCount: 0,
            failedPomodoros: 0,
            completeDate: ''
        }
    }

}

export default ModalView