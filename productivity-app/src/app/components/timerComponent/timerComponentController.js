import {eventBus} from "../../eventBus";

class TimerComponentController {
    constructor(model, view) {
        this.model = model
        this.view = view
        eventBus.subscribe('addPomodoro', this.addPomodoro)
        eventBus.subscribe('failPomodoro', this.failPomodoro)
        eventBus.subscribe('finishPomodoro', this.finishPomodoro)
        eventBus.subscribe('finishTask', this.finishTask)
        eventBus.subscribe('startTimer', this.startTimer)
        this.renderTimer(this.model.activeTask, this.model.correctCycleData)
    }

    renderTimer = (task, settings) => this.view.render(task, settings)

    finishTask = () => {
        this.view.displayFinishedTask()
        this.view.displayCompletedPomodorosIcons()
        this.model.finishTask()
    }

    finishPomodoro = () => {
        this.model.addCompletedPomodoro()
        this.view.displayCompletedPomodorosIcons(true)
        this.view.displayCompletedPomodoro()
        if (this.checkTaskFinish()) {
            this.finishTask()
            return
        }
        this.startBreak()
    }

    addPomodoro = () => {
        if (this.model.activeTask.estimation < 10) {
            this.view.displayEmptyPomodoros(this.model.activeTask.estimation, true)
        } else {
            this.view.hidePlusButton()
        }
        this.model.addEstimation()
    }

    startTimer = () => this.view.startWorkTime()

    failPomodoro = () => {
        this.model.addFailPomodoro()
        this.view.addFailedPomodoro()
        if (this.checkTaskFinish()) {
            this.finishTask()
            return
        }
        this.startBreak()
    }

    checkTaskFinish = () => this.model.activeTask.estimation ===
        (this.model.activeTask.failedPomodoros + this.model.activeTask.completedCount)

    startBreak = () => {
        if (this.view.pastedWorkIterations < this.view.cycleData.workIteration) {
            this.view.startShortBreak()
        } else {
            this.view.pastedWorkIterations = 0
            this.view.startLongBreak()
        }
    }
}

export default TimerComponentController