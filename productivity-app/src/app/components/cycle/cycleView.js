import template from './counter.hbs'
import {eventBus} from "../../eventBus";

class CycleView {
    constructor() {
        this.countersList = document.querySelector('.settings-pomodoros__list')
    }

    renderCounters = data => {
        this.countersData = data
        this.generateCounters()
        this.appendCounters()
        this.renderCycle()
        this.bindCounterEvents()
        this.bindSaveEvent()
    }

    generateCounters = () => this.countersHtml = Object.values(this.countersData).map(item => template(item)).join('')

    appendCounters = () => this.countersList.innerHTML = this.countersHtml

    bindCounterEvents = () => {
        const counters = Array.from(document.querySelectorAll('.settings-pomodoros__element'))
        counters.forEach(item => item.addEventListener('click', ({target}) => {
            if (target.classList.contains('icon-minus')) {
                const counter = item.querySelector('.counter__number')
                const value = Number(counter.value)
                const key = this.convertCountersId(item.id)
                if (value !== this.countersData[key].min) {
                    counter.value = value - this.countersData[key].step
                }
                this.renderCycle()
                return
            }

            if (target.classList.contains('icon-add')) {
                const counter = item.querySelector('.counter__number')
                const value = Number(counter.value)
                const key = this.convertCountersId(item.id)
                if (value !== this.countersData[key].max) {
                    counter.value = value + this.countersData[key].step
                }
                this.renderCycle()
            }
        }))
    }

    getCountersValues = () => {
        const counters = Array.from(this.countersList.querySelectorAll('.counter__number'))
        const counterValues = {}
        counters.forEach(item => {
            const key = this.convertCountersId(item.closest('.settings-pomodoros__element').id)
            counterValues[key] = Number(item.value)
        })
        return counterValues
    }

    renderCycle = () => this.createCycle(this.getCountersValues())

    createCycle = ({workTime, workIteration, shortBreak, longBreak}) => {
        const firstRow = document.querySelector('.cycle__first-row');
        const secondRow = document.querySelector('.cycle__second-row');
        const thirdRow = document.querySelector('.cycle__third-row')

        const wholeWorkTime = (workIteration * 2) * workTime
        const shortBreakTime = ((workIteration * 2) - 2) * shortBreak;
        const minutesSum = wholeWorkTime + shortBreakTime + shortBreak;
        const firstCycle = (wholeWorkTime + shortBreakTime) / 2 + longBreak;

        const createGraphElem = (color, counterValue) => {
            const elem = document.createElement('div');
            elem.classList.add(color);
            elem.style.height = "10px";
            elem.style.width = ((counterValue / minutesSum) * 100) + '%';
            secondRow.appendChild(elem);
        }

        const createInfoElem = (side, row) => {
            const container = document.createElement('div');
            container.classList.add(`cycle__${side}-elem`);
            row.appendChild(container);
            const text = document.createElement('span');
            const point = document.createElement('div');
            text.classList.add(`cycle__${side}-text`);
            container.appendChild(text);
            point.classList.add('cycle__point');
            container.appendChild(point);
            return [container, text, point];
        }

        firstRow.innerHTML = '';
        secondRow.innerHTML = '';
        thirdRow.innerHTML = '';

        let bottomTime = 0;

        for (let i = 0; i < workIteration * 2; i++) {

            createGraphElem('work', workTime)

            if (i < 3) {
                const [topPoint, text, point] = createInfoElem('top', firstRow)

                switch (i) {
                    case 0:
                        text.innerHTML = '0m';
                        break;
                    case 1:
                        text.innerHTML = `First cycle: ${Math.floor(firstCycle / 60)}h ${firstCycle % 60}m`;
                        topPoint.style.marginLeft = ((firstCycle / minutesSum) * 100) + "%";
                        break;

                    case 2:
                        topPoint.style.justifyContent = "flex-end";
                        point.style.float = "right";
                        text.innerHTML = `${Math.floor(minutesSum / 60)}h ${minutesSum % 60}m`;
                        topPoint.style.marginLeft = (((minutesSum - firstCycle) / minutesSum) * 100) + "%";
                        break;
                }
            }

            if (i < Math.floor(minutesSum / 30)) {
                const [bottomPoint, text, point] = createInfoElem('bottom', thirdRow);

                bottomTime += 30;
                bottomPoint.style.marginLeft = ((30 / minutesSum) * 100) + "%";
                if (i === 0) {
                    text.innerHTML = '30m';
                    text.classList.add('cycle__bottom-display');
                    point.classList.add('cycle__bottom-display');
                } else {
                    text.innerHTML = `${Math.floor(bottomTime / 60)}h`;
                    if (bottomTime % 60 === 30) {
                        text.innerHTML += ' 30m'
                        text.classList.add('cycle__bottom-display');
                        point.classList.add('cycle__bottom-display');
                    }
                }
            }

            if (i !== workIteration - 1 && i !== (workIteration * 2) - 1) {
                createGraphElem('other', shortBreak);
            }

            if (i === workIteration - 1) {
                createGraphElem('hobby', longBreak);
            }
        }
    }

    bindSaveEvent = () => document.querySelector('.settings-pomodoros__save')
        .onclick = () => eventBus.publish('saveSettings', this.getCountersValues())

    convertCountersId = id => id
        .toLowerCase()
        .replace(/(?:\s+)(\w+)/g, (_, word) =>
            word.charAt(0).toUpperCase() + word.substr(1))


}

export default CycleView