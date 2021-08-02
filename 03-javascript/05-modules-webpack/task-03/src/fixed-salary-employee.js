import AbstractEmployee from './abstract-employee'

class FixedSalaryEmployee extends AbstractEmployee {
    constructor(id, name, salary) {
        super(id, name, salary)
        this.id = 'id' + id
        this.name = name
        this.salary = salary
    }

    getSalary() {
        return this.salary
    }
}

export default FixedSalaryEmployee