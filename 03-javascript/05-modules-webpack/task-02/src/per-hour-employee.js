var AbstractEmployee = require('./abstract-employee')

var PerHourSalaryEmployee = function(id, name, salary) {
    AbstractEmployee.apply(this, arguments)
    this.id = 'id' + id
    this.name = name
    this.salary = Math.round(salary * 20.88 * 8)
};

PerHourSalaryEmployee.prototype.getSalary = function() {
    return this.salary
}

module.exports = PerHourSalaryEmployee