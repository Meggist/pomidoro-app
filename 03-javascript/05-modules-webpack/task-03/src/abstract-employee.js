class AbstractEmployee {
    constructor(id, name, salary) {
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

    getSalary() {
        throw new Error('Method getSalary() must be implemented')
    }
}

export default AbstractEmployee