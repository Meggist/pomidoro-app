class TimerComponentController {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.renderTimer(this.model.getActivetask(), this.model.cycleData)
    }

    renderTimer = (task, settings) => {
        this.view.render(task)
    }
}

export default TimerComponentController