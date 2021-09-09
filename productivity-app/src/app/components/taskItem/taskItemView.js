import template from './taskItem_tmpl.hbs'

class TaskItemView {
    constructor(task) {
        this.priorityindex = task.priority
        task.priority = this.getPriorityClass(task.priority)
        this.getDate(task)
        this.task = template(task)
        task.priority = this.priorityindex
    }

    getPriorityClass = (index) => ({
        1: 'low',
        2: 'middle',
        3: 'high',
        4: 'urgent'
    })[index]

    getMonth = (index) => ({
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    })[index]

    getDate = (task) => {
        let deadlineDate = new Date(task.deadlineDate)
        let currentDate = new Date(Date.now())
        if (deadlineDate.getDate() === currentDate.getDate()) {
            task.deadlineDateToday = 'Today'
        } else {
            task.deadlineDay = deadlineDate.getDate()
            task.deadlineMonth = this.getMonth(deadlineDate.getMonth())
        }
    }
}

export default TaskItemView