import Header from "../../components/header/header";
import template from './timer.hbs';

class Timer {
    constructor() {
        document.body.innerHTML = template()
        const header = new Header('Timer')
    }
}

export default Timer