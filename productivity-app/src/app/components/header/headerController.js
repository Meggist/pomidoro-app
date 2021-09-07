import {eventBus} from "../../eventBus";
import Modal from "../modal/modal";

class HeaderController {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.body = document.body
        this.render(this.model, this.body)
        eventBus.subscribe('displayAllTasks', this.bindRemoveModeEvents)
    }

    render = (data, target) => this.view.append(this.view.render(data), target)

    bindRemoveModeEvents = () => {
        this.allTasks = Array.from(document.querySelectorAll('.tasks__element'))
        this.bindRemoveModeEvent()
        this.bindRemoveModeClickEvent()
        this.bindRemoveTabsEvent()
    }

    bindRemoveTabsEvent = () => {
        const selectAllButtons = Array.from(document.querySelectorAll('.task-type__select-all'))
        const deselectAllButtons = Array.from(document.querySelectorAll('.task-type__deselect-all'))

        selectAllButtons.forEach(tab => tab.onclick = () => {
            this.getCertainTasks(tab).forEach(item => {
                const trashIcon = item.querySelector('.remove-mode-trash')
                if (!trashIcon.classList.contains('hidden')) {
                    trashIcon.click()
                }
            })
        })

        deselectAllButtons.forEach(tab => tab.onclick = () => {
            this.getCertainTasks(tab).forEach(item => {
                const trashIcon = item.querySelector('.remove-mode-cancel')
                if (!trashIcon.classList.contains('hidden')) {
                    trashIcon.click()
                }
            })
        })
    }

    getCertainTasks = tab => {
        return tab.classList.contains('daily') ?
            Array.from(document.querySelector('.tasks__list').querySelectorAll('.tasks__element'))
                .filter(item => !item.classList.contains('hidden')) :
            Array.from(document.querySelector('.global-list-groups').querySelectorAll('.tasks__element'))

    }

    bindRemoveModeEvent = () => {
        this.view.menu.querySelector('.icon-trash').onclick = () => {
            if (this.model.selectedTasks.length) {
                eventBus.subscribe('cleanBasket', this.cleanBasket)
                new Modal('delete', this.model.selectedTasks)
            }
            this.view.isRemoveMode = !this.view.isRemoveMode
            this.view.handleRemoveMode()
        }
    }

    clickSelectedTasks = ()=> this.allTasks.filter(item => this.model.selectedTasks.includes(item.id))
        .forEach(item => {
            const trashIcon = item.querySelector('.remove-mode-trash')
            if (!trashIcon.classList.contains('hidden')) {
                this.model.selectedTasks =  this.model.selectedTasks.filter(id => id !== item.id)
                trashIcon.click()
            }
        })

    cleanBasket = () => {
        this.model.selectedTasks = []
        this.view.displaySelectedTasks(this.model.selectedTasks.length)
    }

    bindRemoveModeClickEvent = () => {
        this.allTasks.forEach(task => {
            task.addEventListener('click', event => {
                if (event.target.classList.contains('remove-mode-trash')) {
                    event.stopImmediatePropagation()
                    event.target.classList.add('hidden')
                    event.target.nextElementSibling.classList.remove('hidden')
                    eventBus.publish('addSelectedTask', task.id)
                    this.view.displaySelectedTasks(this.model.selectedTasks.length)
                    return
                }

                if (event.target.classList.contains('remove-mode-cancel')) {
                    event.stopImmediatePropagation()
                    event.target.classList.add('hidden')
                    event.target.previousElementSibling.classList.remove('hidden')
                    eventBus.publish('deleteSelectedTask', task.id)
                    this.view.displaySelectedTasks(this.model.selectedTasks.length)
                }
            })
        })
    }
}

export default HeaderController