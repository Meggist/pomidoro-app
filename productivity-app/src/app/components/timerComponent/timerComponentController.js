import {eventBus} from "../../eventBus";

class TimerComponentController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('addPomodoro', this.addPomodoro)
        this.renderTimer(this.model.activeTask, this.model.cycleData)
    }

    renderTimer = (task, settings) => {
        this.view.render(task)
    }

    addPomodoro = () => {
        this.model.addEstimation()
        this.view.displayPomodoros(this.model.activeTask.estimation)
    }
}

export default TimerComponentController