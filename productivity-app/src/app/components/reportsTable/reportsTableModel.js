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
            urgent: new Array(7),
            high: new Array(7),
            middle: new Array(7),
            low: new Array(7),
            failed: new Array(7),
            weekDays: new Array(7)
        }

        Object.keys(dataObj).forEach(key => dataObj[key].fill(0, 0, 7))
        dataObj.weekDays.fill('', 0, 7)
        const today = new Date()
        dataObj.weekDays = dataObj.weekDays.map(item => {
            const newDate = new Date(today.setDate(today.getDate() - 1));
            return this.days[newDate.getDay()];
        }).reverse()
        dataObj.weekDays = dataObj.weekDays
            .reduce(((previousValue, currentValue, index) => ({...previousValue, [currentValue]: index})), {})

        data.forEach(item => {
            const dayName = this.days[new Date(item.completeDate).getDay() - 1]
            const completeDay = dataObj.weekDays[dayName]
            if (this.type === 'pomodoros') {
                dataObj[this.getPriority(item.priority)][completeDay] += item.completedCount
                dataObj.failed[completeDay] += item.failedPomodoros
            } else {
                item.failedPomodoros > item.completedCount
                    ? ++dataObj.failed[completeDay]
                    : ++dataObj[this.getPriority(item.priority)][completeDay]
            }
        })
        //const obj = Object.assign({}, dataObj.weekDays)
        //dataObj.weekDays = Object.keys(obj).forEach(dataObj[]);
        console.log(dataObj)
        return dataObj
    }

    days = ['MON', 'TUE', 'WED', 'THU',
        'FRI', 'SAT', 'SUN']

    renderMonthData = (data, amount, state) => {
        const dataObj = {
            urgent: new Array(30),
            high: new Array(30),
            middle: new Array(30),
            low: new Array(30),
            failed: new Array(30),
        }

        Object.keys(dataObj).forEach(key => dataObj[key].fill(0, 0, 30))

        data.forEach(item => {
            let nowDate = new Date(Date.now())
            let completeDay = new Date(item.completeDate)
            const diffInMs = new Date(nowDate) - new Date(completeDay)
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
            const date = Math.ceil(30 - diffInDays) - 1

            if (this.type === 'pomodoros') {
                dataObj[this.getPriority(item.priority)][date] += item.completedCount
                dataObj.failed[date] += item.failedPomodoros
            } else {
                item.failedPomodoros > item.completedCount
                    ? ++dataObj.failed[date]
                    : ++dataObj[this.getPriority(item.priority)][date]
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
        const monthAgoDate = new Date(new Date().setDate(new Date().getDate() - 30))
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
        'month': this.renderMonthData
    })[name]

}

export default ReportsTableModel