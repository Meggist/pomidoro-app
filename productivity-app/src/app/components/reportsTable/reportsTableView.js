import template from './reportsTable.hbs'

class ReportsTableView {
    constructor(period, type) {
        document.querySelector(`.reports-tabs__${period}`).classList.add('active')
        document.querySelector(`.reports-tabs__${type}`).classList.add('active')
        this.reportsContainer = document.querySelector('.graph__content')
    }

    append = data => this.reportsContainer.innerHTML = template(data)
}

export default ReportsTableView