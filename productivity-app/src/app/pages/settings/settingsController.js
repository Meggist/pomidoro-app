import Header from "../../components/header/header";
import Cycle from "../../components/cycle/сycle";

class SettingsController {
    constructor(view) {
        this.view = view

        this.render()
    }

    render = () => {
        this.view.append()
        const header = new Header('Settings')
        this.view.display()
        this.cycle = new Cycle()
    }
}

export default SettingsController