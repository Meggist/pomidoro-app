import {dataBase} from "../../firebase";
import {eventBus} from "../../eventBus";

class ReportsTableModel {
    constructor(period, type) {
        this.period = period
        this.type = type
        this.periodFilter = this.getFilterPeriod(period)
        this.periodRender = this.getRenderPeriod(period)
    }

    renderTodayData = data => {
        const todayObj = {
            title: this.type.toLowerCase(),
            urgent: 0,
            high: 0,
            middle: 0,
            low: 0,
            failed: 0
        }

        if (this.type === 'pomodoros') {
            data.forEach(item => {
                todayObj[this.getPriority(item.priority)] += item.completedCount
                todayObj.failed += item.failedPomodoros
            })
        } else {
            data.forEach(item => item.failedPomodoros > item.completedCount ? ++todayObj.failed
                : ++todayObj[this.getPriority(item.priority)])
        }
        return todayObj
    }

    renderWeekData = data => {
        const dataObj = {
            urgent: new Array(5),
            high: new Array(5),
            middle: new Array(5),
            low: new Array(5),
            failed: new Array(5),
        }

        Object.keys(dataObj).forEach(key => dataObj[key].fill(0, 0, 5))
        data.forEach(item => {
            const completeDay = new Date(item.completeDate).getDay() - 1
            if (this.type === 'pomodoros') {
                dataObj[this.getPriority(item.priority)][completeDay] += item.completedCount
                dataObj.failed[completeDay] += item.failedPomodoros
            } else {item.failedPomodoros > item.completedCount
                    ? ++dataObj.failed[completeDay]
                    : ++dataObj[this.getPriority(item.priority)][completeDay]
            }
        })
        return dataObj
    }


getData = () => {
    dataBase.getFieldFromDB('taskCollection')
        .then(data => {
            const finalObject = {}
            let filteredData = Object.values(data).filter(item => this.periodFilter(new Date(item.completeDate)))
            finalObject.date = this.period
            finalObject.data = this.periodRender(filteredData)
            return finalObject
        })
        .then(data => eventBus.publish('getReportsData', data))
}

getPriority = index => ({
    1: 'low',
    2: 'middle',
    3: 'high',
    4: 'urgent'
})[index]

isToday = date => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
}

getStartWeekDate = () => {
    let now = new Date();
    let dayOfWeek = now.getDay()
    let numDay = now.getDate();

    let start = new Date(now)
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0)

    return start
}

isLastWeek = date => this.getStartWeekDate() < date


isLastMonth = date => {
    const monthAgoDate = new Date();
    monthAgoDate.setDate(1);
    monthAgoDate.setMonth(monthAgoDate.getMonth() - 1)
    return date > monthAgoDate
}

getFilterPeriod = name => ({
    'day': this.isToday,
    'week': this.isLastWeek,
    'month': this.isLastMonth
})[name]

getRenderPeriod = name => ({
    'day': this.renderTodayData,
    'week': this.renderWeekData,
    'month': () => {
    }
})[name]

}

export default ReportsTableModel