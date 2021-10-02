import {eventBus} from "../../eventBus";

class CycleController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('getCycleData', this.append)
        eventBus.subscribe('saveSettings', this.handleSaveEvent)
        this.render()
    }

    render = () => this.model.getValues()

    append = data => this.view.renderCounters(data)

    handleSaveEvent = async data => {
        $('main').notification({type: 'success', text: 'Settings was successfully saved'})
        await this.model.pushValues(data)
        window.location.href = "http://localhost:3000/task-list"
    }
}

export default CycleController