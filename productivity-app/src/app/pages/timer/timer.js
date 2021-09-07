import Header from "../../components/header/header";
import template from './timer.hbs';
import {router} from "../../router";

class Timer {
    constructor() {
        router.changeDefaultRoute()
        document.body.innerHTML = template()
        const header = new Header('Timer')
    }
}

export default Timer