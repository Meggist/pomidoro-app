var AbstractEmployee = require('./abstract-employee')

var FixedSalaryEmployee = function(id, name, salary) {
    AbstractEmployee.apply(this, arguments)
    this.id = 'id' + id
    this.name = name
    this.salary = salary
}

FixedSalaryEmployee.prototype.getSalary = function() {
    return this.salary
}

module.exports = FixedSalaryEmployee