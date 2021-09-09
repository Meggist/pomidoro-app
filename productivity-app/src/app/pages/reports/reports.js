import Header from "../../components/header/header";
import template from './reports.hbs';
import {router} from "../../router";
import ReportsTable from "../../components/reportsTable/reportsTable";

class Reports {
    constructor(period, type) {
        router.changeDefaultRoute()
        document.getElementById('root').innerHTML = template()
        this.bindRoutesEvents()
        const header = new Header('Reports')
        const reportsTable = new ReportsTable(period, type)
    }

    bindRoutesEvents = () => {
        document.querySelector('.reports__arrow')
            .onclick = () => window.location.href = "http://localhost:3000/task-list"

        document.querySelector('.main').addEventListener('click', ({target}) => {
            if (target.classList.contains('tabs')) {
                let period
                let type
                if (target.closest('.period')) {
                    period = target.textContent.toLowerCase()
                    type = document.querySelector('.type .active').textContent.toLowerCase()
                } else {
                    type = target.textContent.toLowerCase()
                    period = document.querySelector('.period .active').textContent.toLowerCase()
                }
                window.location.href = `http://localhost:3000/reports/${period}/${type}`
            }
        })
    }

}

export default Reports