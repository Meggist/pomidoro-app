import componentTemplate from './timerComponent.hbs'
import pomodoroIcon from './pomodoroIcon.hbs'
import {eventBus} from "../../eventBus";


class TimerComponentView {
    constructor() {
        this.timerSection = document.querySelector('.timer')
        this.icons = {
            empty: {
                name: 'empty-tomato',
                alt: 'empty tomato'
            }
        }
    }

    render = (task, cycleData) => {
        this.task = task
        this.cycleData = cycleData
        const timerHtml = componentTemplate(task)
        this.append(timerHtml)
        this.addPomodoroButton = document.querySelector('.timer__add-icon')
        this.bindAllEvents()
        this.displayPomodoros(task.estimation)
    }

    append = content => this.timerSection.innerHTML = content

    displayPomodoros = estimation => {
        let pomodoros = new Array(estimation)
        pomodoros = pomodoros.fill(pomodoroIcon(this.icons.empty), 0, estimation).join('')
        document.querySelector('.pomodors-icons').innerHTML = pomodoros
    }

    bindAllEvents = () => {
        this.bindStartEvent()
        this.bindAddPomodoroEvent()
    }

    bindStartEvent = () => {

    }

    bindAddPomodoroEvent = () =>
        this.addPomodoroButton.onclick = () => eventBus.publish('addPomodoro')
}

export default TimerComponentView