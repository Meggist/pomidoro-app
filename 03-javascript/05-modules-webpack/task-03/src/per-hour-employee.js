import AbstractEmployee from './abstract-employee';

class PerHourSalaryEmployee extends AbstractEmployee {
    constructor(id, name, salary) {
        super(id, name, salary)
        this.id = 'id' + id
        this.name = name
        this.salary = Math.round(salary * 20.88 * 8)
    }

    getSalary() {
        return this.salary
    }
}

export default PerHourSalaryEmployee