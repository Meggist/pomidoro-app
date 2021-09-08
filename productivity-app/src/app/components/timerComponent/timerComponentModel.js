class TimerComponentModel {
    constructor(taskCollection, cycleData) {
        this.taskCollection = taskCollection
        this.cycleData = cycleData
        this.activeTask = this.getActivetask()
        this.correctCycleData = this.getTimerSettings()
    }

    getActivetask = () => Object.values(this.taskCollection).find(item => item.status.ACTIVE === true)

    getTimerSettings = () => this.cycleData
        ? this.cycleData
        : {
            workTime: 25,
            workIteration: 5,
            shortBreak: 5,
            longBreak: 30
        }

    addEstimation = () => {
        if (this.activeTask.estimation < 10) {
            ++this.activeTask.estimation
        }
    }

    addFailPomodoro = () => ++this.activeTask.failedPomodoros
    addCompletedPomodoro = () => ++this.activeTask.completedCount

    finishTask = () => {
        const restCompletedPomodoro = this.activeTask.estimation - (this.activeTask.failedPomodoros + this.activeTask.completedCount)
        this.activeTask.completedCount += restCompletedPomodoro
        console.log(this.activeTask)
    }


}

export default TimerComponentModel
