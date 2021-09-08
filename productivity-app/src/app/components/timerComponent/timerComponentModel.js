class TimerComponentModel {
    constructor(taskCollection, cycleData) {
        this.taskCollection = taskCollection
        this.cycleData = cycleData
        this.activeTask = this.getActivetask()
    }

    getActivetask = () => Object.values(this.taskCollection).find(item => item.status.ACTIVE === true)

    addEstimation = () => {
        if (this.activeTask.estimation < 10) {
            ++this.activeTask.estimation
        }
    }

}

export default TimerComponentModel