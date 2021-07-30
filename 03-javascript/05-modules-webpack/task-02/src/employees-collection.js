var PerHourSalaryEmployee = require('./per-hour-employee');
var FixedSalaryEmployee = require('./fixed-salary-employee')
var workers = require('./employees-collection.json')

var EmployeeCollection = function(Employees) {

    this.employeesArray = []

    for (var i = 0; i < Employees.length; i++) {
        if (Employees[i].type === "per-hour") {
            this.employeesArray.push(new PerHourSalaryEmployee(i, Employees[i].name, Employees[i].salary))
        } else {
            this.employeesArray.push(new FixedSalaryEmployee(i, Employees[i].name, Employees[i].salary))
        }
    }

    this.employeesArray.sort(compare)

    function compare(a, b) {
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
}

EmployeeCollection.prototype.getCollectionData = function() {
    return this.employeesArray
}

EmployeeCollection.prototype.getFiveNames = function() {
    var fiveNames = []
    for (var i = 0; i < 5; i++) {
        fiveNames.push(this.employeesArray[i].name)
    }
    return fiveNames;
}

EmployeeCollection.prototype.getThreeIds = function() {
    var treeIds = []
    for (var i = this.employeesArray.length - 1; i > this.employeesArray.length - 4; i--) {
        treeIds.push(this.employeesArray[i].id)
    }
    return treeIds
}

EmployeeCollection.prototype.getCollectionAverage = function() {
    var avarageSalary = 0
    for (var i = 0; i < this.employeesArray.length; i++) {
        avarageSalary += this.employeesArray[i].salary
    }
    return (avarageSalary / this.employeesArray.length)
}

module.exports = EmployeeCollection