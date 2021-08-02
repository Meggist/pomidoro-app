var AbstractEmployee = function(id, name, salary) {
    if (this.constructor === AbstractEmployee) {
        throw new Error("Can't instantiate abstract class!");
    } else if (typeof(id) !== 'number' || typeof(name) !== 'string' || typeof(salary) !== 'number') {
        throw new Error("Wrong object passed!");
    } else {
        this.id = id
        this.name = name
        this.salary = salary
    }
};

AbstractEmployee.prototype.getSalary = function() {
    throw new Error('Method getSalary() must be implemented')
}

module.exports = AbstractEmployee