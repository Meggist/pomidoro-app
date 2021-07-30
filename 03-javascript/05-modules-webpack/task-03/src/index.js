import EmployeeCollection from './employees-collection';
const employees_collection = require('./employees-collection.json')

const coworkers = new EmployeeCollection(employees_collection)

const fiveNames = () => {
    let string = ''
    const names = coworkers.getFiveNames();
    for (let i = 0; i < names.length - 1; ++i) {
        string += names[i] + `, `
    }
    string += names[names.length - 1]
    document.getElementById("five-names").textContent = string
}

const threeIds = () => {
    let string = ''
    const arrOfIds = coworkers.getThreeIds();
    for (let i = 0; i < arrOfIds.length - 1; i++) {
        string += arrOfIds[i] + `, `
    }
    string += arrOfIds[arrOfIds.length - 1]
    document.getElementById("three-ids").textContent = string
}

const averageSalary = () => {
    let string = coworkers.getCollectionAverage().toString();
    document.getElementById("collection-average").textContent = string
}

const collectionDraw = () => {
    let string = JSON.stringify(coworkers.getCollectionData(), null, 2);
    document.getElementById("collection-content").textContent = string
}

fiveNames()
threeIds()
averageSalary()
collectionDraw()