import Header from "../../components/header/header";
import template from './timer.hbs';
import {router} from "../../router";
import {dataBase} from "../../firebase";
import TimerComponent from "../../components/timerComponent/timerComponent";

class Timer {
    constructor() {
        router.changeDefaultRoute()
        document.getElementById('root').innerHTML = template()
        this.header = new Header('Timer')
        dataBase.getFieldFromDB('taskCollection').then(taskCollection =>
            dataBase.getFieldFromDB('cycleData').then(cycleData => new TimerComponent(taskCollection, cycleData))
        )
    }
}

export default Timer