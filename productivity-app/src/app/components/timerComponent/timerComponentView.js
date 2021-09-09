import componentTemplate from './timerComponent.hbs'
import pomodoroIcon from './pomodoroIcon.hbs'
import {eventBus} from "../../eventBus";


class TimerComponentView {
    constructor() {
        this.timerSection = document.querySelector('.timer')
        this.icons = {
            empty: {
                name: 'empty-tomato',
                alt: 'empty pomodoro'
            },
            fill: {
                name: 'fill tomato',
                alt: "fill pomodoro"
            },
            failed: {
                name: 'tomato-failed',
                alt: "failed pomodoro"
            }
        }
        this.timerData = {
            states: {
                isWorkTime: false,
                isShortBreak: false,
                isLongBreak: false
            },
            pastedWorkIterations: 0,
            isPastedLongBreak: false
        }
    }

    render = (task, cycleData) => {
        this.task = task
        this.cycleData = cycleData
        const timerHtml = componentTemplate(task)
        this.append(timerHtml)
        this.getTargets()
        this.bindAllEvents()
        this.displayEmptyPomodoros(task.estimation)
    }

    getTargets = () => {
        this.headerMenu = document.querySelector('.header__menu')
        this.timerButtonsContainer = document.querySelector('.timer__buttons')
        this.addPomodoroButton = document.querySelector('.timer__add-icon')
        this.startButton = document.querySelector('.timer__start')
        this.failButton = document.querySelector('.timer__fail--inProgress')
        this.finishPomodoroButton = document.querySelector('.timer__finish--inProgress')
        this.finishTaskButton = document.querySelector('.timer__finish-task')
        this.pomodorsIconsContainer = document.querySelector('.pomodors-icons')
        this.routeTaskListButton = document.querySelector('.timer__arrow')
        this.routeReportsButton = document.querySelector('.timer__arrow-right')
        this.timerValue = document.querySelector('.meter__image')
    }

    append = content => this.timerSection.innerHTML = content

    displayEmptyPomodoros = (estimation, isAdding) => {
        if (isAdding) {
            this.pomodorsIconsContainer.innerHTML += pomodoroIcon(this.icons.empty)
            return
        }

        let pomodoros = new Array(estimation)
        pomodoros = pomodoros.fill(pomodoroIcon(this.icons.empty), 0, estimation).join('')
        this.pomodorsIconsContainer.innerHTML = pomodoros
    }

    addFailedPomodoro = () => {
        const pomodoroImages = Array.from(document.querySelectorAll('.timer__pomodoro-icon'))
        const target = pomodoroImages.find(item => item.alt === 'empty pomodoro')
        if (target) {
            target.src = `../images/${this.icons.failed.name}.svg`
            target.alt = this.icons.failed.alt
        }
    }

    displayCompletedPomodorosIcons = isAdding => {
        const pomodoroImages = Array.from(document.querySelectorAll('.timer__pomodoro-icon'))
        let target
        isAdding ? target = pomodoroImages.filter(item => item.alt === 'empty pomodoro').slice(0, 1) :
            target = pomodoroImages.filter(item => item.alt === 'empty pomodoro')

        target.forEach(item => {
            item.src = `../images/${this.icons.fill.name}.svg`
            item.alt = this.icons.fill.alt
        })
    }

    displayCompletedPomodoro = () => {
        this.failButton.classList.add('hidden')
        this.finishPomodoroButton.classList.add('hidden')
        this.finishTaskButton.classList.remove('hidden')
        this.startButton.classList.remove('hidden')
    }

    bindAllEvents = () => {
        this.bindStartEvent()
        this.bindFailEvent()
        this.bindFinishPomodoroEvent()
        this.bindFinishTaskEvent()
        this.bindAddPomodoroEvent()
        this.bindReportsRouteEvent()
        this.bindTaskListRouteEvent()
    }

    bindStartEvent = () => {
        this.startButton.onclick = () => eventBus.publish('startTimer')
    }

    bindAddPomodoroEvent = () =>
        this.addPomodoroButton.onclick = () => eventBus.publish('addPomodoro')

    bindTaskListRouteEvent = () => this.routeTaskListButton
        .onclick = () => window.location.href = window.location.href = "http://localhost:3000/task-list"

    bindReportsRouteEvent = () => this.routeReportsButton
        .onclick = () => window.location.href = window.location.href = "http://localhost:3000/reports/day/tasks"

    bindFailEvent = () => this.failButton.onclick = () => eventBus.publish('failPomodoro')
    bindFinishPomodoroEvent = () => this.finishPomodoroButton.onclick = () => eventBus.publish('finishPomodoro')
    bindFinishTaskEvent = () => this.finishTaskButton.onclick = () => eventBus.publish('finishTask')


    startWorkTime = () => {
        ++this.timerData.pastedWorkIterations
        this.changeNavigationAvailability(false)
        this.timerValue.textContent = 'Work Time: ' + this.cycleData.workTime + 'min'
        this.startButton.classList.add('hidden')
        this.failButton.classList.remove('hidden')
        this.finishPomodoroButton.classList.remove('hidden')
        this.finishTaskButton.className = 'timer__finish-task hidden'
        this.routeTaskListButton.className = 'icon-arrow-left timer__arrow hidden'
    }
    startShortBreak = () => {
        this.timerValue.textContent = 'Short Break Time: ' + this.cycleData.shortBreak + 'min'
        this.startButton.classList.remove('hidden')
        this.failButton.classList.add('hidden')
        this.finishPomodoroButton.classList.add('hidden')
    }

    startLongBreak = () => {
        this.timerData.isPastedLongBreak = true
        this.timerValue.textContent = 'Long Break Time: ' + this.cycleData.longBreak + 'min'
        this.startButton.classList.remove('hidden')
        this.failButton.classList.add('hidden')
        this.finishPomodoroButton.classList.add('hidden')
    }

    hidePlusButton = () => this.addPomodoroButton.classList.add('hidden')

    displayFinishedTask = () => {
        this.routeTaskListButton.classList.remove('hidden')
        this.routeReportsButton.classList.remove('hidden')
        this.addPomodoroButton.className = 'icon-add timer__add-icon hidden'
        this.timerButtonsContainer.className = 'timer__buttons hidden'
        this.timerValue.textContent = 'Task is completed'
        this.changeNavigationAvailability(true)
    }

    changeNavigationAvailability = isAble => isAble ? this.headerMenu.classList.remove('hidden')
        : this.headerMenu.className = 'header__menu hidden'
}

export default TimerComponentView