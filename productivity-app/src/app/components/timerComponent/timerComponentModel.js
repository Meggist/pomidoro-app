class TimerComponentModel {
    constructor(taskCollection, cycleData) {
        this.taskCollection = taskCollection
        this.cycleData = cycleData
    }

    getActivetask = () => Object.values(this.taskCollection).find(item => item.status.ACTIVE === true)
}

export default TimerComponentModel