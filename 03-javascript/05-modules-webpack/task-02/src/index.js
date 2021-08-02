var EmployeeCollection = require('./employees-collection')
var employees_collection = require('./employees-collection.json')

var coworkers = new EmployeeCollection(employees_collection)

function fiveNames() {
    var string = ''
    var names = coworkers.getFiveNames();
    for (var i = 0; i < names.length - 1; ++i) {
        string += names[i] + `, `
    }
    string += names[names.length - 1]
    document.getElementById("five-names").textContent = string
}

function threeIds() {
    var string = ''
    var arrOfIds = coworkers.getThreeIds();
    for (var i = 0; i < arrOfIds.length - 1; ++i) {
        string += arrOfIds[i] + `, `
    }
    string += arrOfIds[arrOfIds.length - 1]
    document.getElementById("three-ids").textContent = string
}

function averageSalary() {
    var string = coworkers.getCollectionAverage().toString();
    document.getElementById("collection-average").textContent = string
}

function collectionDraw() {
    var string = JSON.stringify(coworkers.getCollectionData(), null, 2);
    document.getElementById("collection-content").textContent = string
}

fiveNames()
threeIds()
averageSalary()
collectionDraw()