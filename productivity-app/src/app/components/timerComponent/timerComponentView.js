import componentTemplate from './timerComponent.hbs'
import pomodoroIcon from './pomodoroIcon.hbs'


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
        this.displayPomodoros(task)
    }

    append = content => this.timerSection.innerHTML = content

    displayPomodoros = ({estimation}) => {
        let pomodoros = new Array(estimation)
        pomodoros = pomodoros.fill(pomodoroIcon(this.icons.empty), 0, estimation).join('')
        this.addPomodoroButton = document.querySelector('.timer__add-icon')
        this.addPomodoroButton.insertAdjacentHTML('beforebegin', pomodoros)
    }

}

export default TimerComponentView