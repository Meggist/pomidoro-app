import TimerComponentModel from "./timerComponentModel";
import TimerComponentView from "./timerComponentView";
import TimerComponentController from "./timerComponentController";

class TimerComponent {
    constructor(taskCollection, cycleData) {
        this.model = new TimerComponentModel(taskCollection, cycleData)
        this.view = new TimerComponentView()
        this.controller = new TimerComponentController(this.model, this.view)
    }
}

export default TimerComponent