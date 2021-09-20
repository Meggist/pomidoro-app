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
                name: 'fill-tomato',
                alt: "fill pomodoro"
            },
            failed: {
                name: 'tomato-failed',
                alt: "failed pomodoro"
            }
        }
        this.pastedWorkIterations = 0
    }

    render = (task, cycleData) => {
        this.task = task
        this.cycleData = cycleData
        const timerHtml = componentTemplate(task)
        this.append(timerHtml)
        this.getTargets()
        this.bindAllEvents()
        this.displayEmptyPomodoros(task.estimation)
        this.outerCycle.classList.add(`${this.task.categoryId}-border`)
        $(".timer__cycle").radialTimer({content: 'Let`s do It!', showFull: false})
    }

    getTargets = () => {
        this.header = document.querySelector('.header')
        this.timerButtonsContainer = document.querySelector('.timer__buttons')
        this.addPomodoroButton = document.querySelector('.timer__add-icon')
        this.startButton = document.querySelector('.timer__start')
        this.failButton = document.querySelector('.timer__fail--inProgress')
        this.finishPomodoroButton = document.querySelector('.timer__finish--inProgress')
        this.finishTaskButton = document.querySelector('.timer__finish-task')
        this.pomodorsIconsContainer = document.querySelector('.pomodors-icons')
        this.routeTaskListButton = document.querySelector('.timer__arrow')
        this.routeReportsButton = document.querySelector('.timer__arrow-right')
        this.outerCycle = document.querySelector('.timer__cycle')
        this.insideCircle = document.querySelector('.timer__cycle--inside')
        this.timerContent = document.querySelector('.timer__content')
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
        ++this.pastedWorkIterations
        this.changeNavigationAvailability(false)
        this.startButton.classList.add('hidden')
        this.failButton.classList.remove('hidden')
        this.finishPomodoroButton.classList.remove('hidden')
        this.finishTaskButton.className = 'timer__finish-task hidden'
        this.routeTaskListButton.className = 'icon-arrow-left timer__arrow hidden'
        $(".timer__cycle").radialTimer(
            {
                time: this.cycleData.workTime,
                onTimeout: () => eventBus.publish('finishPomodoro'),
                content: this.returnTimerContentCallback('work'),
                renderInterval: 60
            }
        )

    }

    returnTimerContentCallback = state => (element, time, i) => {
        if (state === 'break') {
            element.find('.timer__break-state').removeClass('hidden')
        }

        if (state === 'work') {
            element.find('.timer__break-state').addClass('hidden')
        }

        if (element.find('.timer__cycle--inside').hasClass('hidden')) {
            element.find('.timer__cycle--inside').removeClass('hidden')
        }

        if (!element.find('.timer_text').hasClass('hidden')) {
            element.find('.timer__text').addClass('hidden')
        }

        if (element.find('.timer__left-time').hasClass('hidden')) {
            element.find('.timer__left-time').removeClass('hidden')
        }


        if (element.find('.timer__minutes').hasClass('hidden')) {
            element.find('.timer__minutes').removeClass('hidden')
        }

        const leftMinutes = Math.floor((time - i) / 60)
        element.find('.timer__left-time').text(leftMinutes)
    }

    displayTimerText = state => {
        this.timerContent.querySelectorAll('.timer__content > *')
            .forEach(item => item.classList.add('hidden'))
        this.timerContent.querySelector('.timer__text').classList.remove('hidden')
        this.insideCircle.classList.add('hidden')
        if (state === 'break') {
            return 'Break is over'
        }

        if (state === 'finish') {
            return 'You completed Task'
        }
    }

    displayBreakFinish = () => {
        this.finishTaskButton.classList.remove('hidden')
        $(".timer__cycle").radialTimer({content: () => this.displayTimerText('break'), showFull: false})
    }

    startBreak = (type, state) => {
        this.startButton.classList.remove('hidden')
        this.failButton.classList.add('hidden')
        this.finishPomodoroButton.classList.add('hidden')
        if (state === 'fail') {
            this.finishTaskButton.classList.add('hidden')
        }
        $(".timer__cycle").radialTimer({
            time: this.cycleData[`${type}Break`],
            onTimeout: this.displayBreakFinish,
            content: this.returnTimerContentCallback('break'),
            renderInterval: 60
        })
    }

    hidePlusButton = () => this.addPomodoroButton.classList.add('hidden')

    displayFinishedTask = () => {
        $(".timer__cycle").radialTimer({content: () => this.displayTimerText('finish'), showFull: false})
        this.routeTaskListButton.classList.remove('hidden')
        this.routeReportsButton.classList.remove('hidden')
        this.addPomodoroButton.className = 'icon-add timer__add-icon hidden'
        this.timerButtonsContainer.className = 'timer__buttons hidden'
        this.changeNavigationAvailability(true)
    }

    changeNavigationAvailability = isAble => isAble ? this.header.classList.remove('hidden')
        : this.header.classList.add('hidden')
}

export default TimerComponentView