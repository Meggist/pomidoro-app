import {db} from "../../firebase";
import {insertDataToDB} from "../../firebase";

const modalWindow = document.querySelector('.modal-window')
const createTaskButton = document.getElementById('createTaskButton')
const closeModalButton = document.getElementById('closeModalButton')
const categories = Array.from(document.querySelectorAll('.modal-category'))
const priorities = Array.from(document.querySelectorAll('.modal-priority'))
const estimations = Array.from(document.querySelectorAll('.modal-estimations > *'))
let links = estimations.map(item => item.src)
let taskId = 1
let taskCollection

const closeModalWindow = () => {
    document.querySelector('.modal-wrapper').classList.add('hidden')
    document.querySelector('.header').classList.remove('hidden')
    document.querySelector('.main').classList.remove('modal-display')
}

const selectModalInputsValue = () => {
    return {
        id: taskId.toString(),
        title: document.getElementById('modalInputTitle').value,
        description: document.getElementById('modalInputDescription').value,
        categoryId: categories.find(item => item.classList.contains('selected-category'))
            .querySelector('.modal-category__text').textContent.toLowerCase(),
        priority: 1 + priorities.slice().reverse().findIndex(item => item.classList.contains('selected-priority')),
        estimation: 1 + links.map(item => {
            const imgNames = item.split('/')
            return imgNames[imgNames.length - 1]
        }).lastIndexOf('fill%20tomato.svg'),

        deadlineDate: new Date(document.getElementById('modalInputDate').value),
        status: {
            GLOBAL_LIST: true,
            DAILY_LIST: false,
            ACTIVE: true,
            COMPLETED: false
        },
        createDate: new Date(Date.now()),
        completedCount: 0,
        failedPomodoros: 0,
        completeDate: ''
    }
}

const changePoint = (field, isSelected, type) => {
    const cycle = field.querySelector('.modal__empty-cycle-category')
    const point = field.querySelector('.modal-point')
    const text = field.querySelector('.modal-category__text')

    if (isSelected) {
        cycle.classList.add('hidden')
        point.classList.remove('hidden')
        text.classList.remove('white-color')
        field.classList.remove(`selected-${type}`)
    } else {
        cycle.classList.remove('hidden')
        point.classList.add('hidden')
        text.classList.add('white-color')
        field.classList.add(`selected-${type}`)
    }
}

const choosePoint = (item, type) => {
    const selectedPoint = modalWindow.querySelector(`.selected-${type}`)
    changePoint(selectedPoint, true, type)
    changePoint(item, false, type)
}

const chooseEstimate = (item, index, nextItem) => {
    links = estimations.map(item => item.src)
    estimations.slice(0, nextItem).forEach(item => item.src = "../images/fill tomato.svg")
    estimations.slice(nextItem, estimations.length).forEach(item => item.src = "../images/empty-tomato.svg")
}

estimations.forEach((item, index) => {
    const nextItem = index + 1
    item.onclick = item.onmouseover = () => chooseEstimate(item, index, nextItem)
    item.onmouseout = () => estimations.forEach((item, index) => item.src = links[index])
})

categories.forEach(item => item.onclick = () => choosePoint(item, 'category'))
priorities.forEach(item => item.onclick = () => choosePoint(item, 'priority'))

modalWindow.addEventListener('click', ({target}) => {
    if (target === closeModalButton) { closeModalWindow() }

    if (target === createTaskButton) {
        db.ref('taskCollection').orderByKey().once("value").then(snapshot => {
            if (snapshot.exists()) {
                taskCollection = Object.values(snapshot.val())
                taskId = taskCollection[taskCollection.length - 1].id
                ++taskId
                insertDataToDB(`taskCollection/${taskId}`, selectModalInputsValue())
            } else {
                insertDataToDB(`taskCollection/${taskId}`, selectModalInputsValue())
                ++taskId
            }
            closeModalWindow()
        });
    }
})















