import {dataBase} from "../../firebase";
import {eventBus} from "../../eventBus";

class ReportsTableModel {
    constructor(period, type) {
        this.period = period
        this.type = type
        this.periodFilter = this.getFilterPeriod(period)
        this.templateObj = {
            date: period.toUpperCase(),
            title: type.toUpperCase(),
            urgent: 0,
            high: 0,
            medium: 0,
            low: 0,
            failed: 0
        }
    }

    getData = () => {
        dataBase.getFieldFromDB('taskCollection')
            .then(data => {
                let filteredData = Object.values(data).filter(item => this.periodFilter(new Date(item.completeDate)))
                if (this.type === 'pomodoros') {
                    filteredData.forEach(item => {
                        this.templateObj[this.getPriority(item.priority)] += item.completedCount
                        this.templateObj.failed += item.failedPomodoros
                    })
                } else {
                    filteredData.forEach(item => item.failedPomodoros > item.completedCount ? ++this.templateObj.failed
                        : ++this.templateObj[this.getPriority(item.priority)])
                }
                return this.templateObj
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

    isLastWeek = date => {
        const weekAgoDate = new Date()
        weekAgoDate.setDate(weekAgoDate.getDate() - 7)
        return date > weekAgoDate
    }

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
}

export default ReportsTableModel