import CycleModel from "./cycleModel";
import CycleController from "./cycleController";
import CycleView from "./cycleView";

class Cycle {
    constructor() {
        this.model = new CycleModel()
        this.view = new CycleView()
        this.model = new CycleController(this.model, this.view)
    }
}

export default Cycle