import PerHourSalaryEmployee from './per-hour-employee';
import FixedSalaryEmployee from './fixed-salary-employee';
const workers = require('./employees-collection.json')

const compare = (a, b) => {
    if (a.salary < b.salary) {
        return 1
    }
    if (a.salary > b.salary) {
        return -1
    }
    if (a.salary == b.salary) {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    }
}

class EmployeeCollection {
    constructor(Employees) {
        this.employeesArray = []

        for (let i = 0; i < Employees.length; i++) {
            if (Employees[i].type === "per-hour") {
                this.employeesArray.push(new PerHourSalaryEmployee(i, Employees[i].name, Employees[i].salary))
            } else {
                this.employeesArray.push(new FixedSalaryEmployee(i, Employees[i].name, Employees[i].salary))
            }
        }

        this.employeesArray.sort(compare)
    }

    getCollectionData() {
        return this.employeesArray
    }

    getFiveNames() {
        let fiveNames = []
        for (let i = 0; i < 5; i++) {
            fiveNames.push(this.employeesArray[i].name)
        }
        return fiveNames;
    }

    getThreeIds() {
        let treeIds = []
        for (let i = this.employeesArray.length - 1; i > this.employeesArray.length - 4; i--) {
            treeIds.push(this.employeesArray[i].id)
        }
        return treeIds
    }

    getCollectionAverage() {
        let avarageSalary = 0
        for (let i = 0; i < this.employeesArray.length; i++) {
            avarageSalary += this.employeesArray[i].salary
        }
        return (avarageSalary / this.employeesArray.length)
    }
}

export default EmployeeCollection