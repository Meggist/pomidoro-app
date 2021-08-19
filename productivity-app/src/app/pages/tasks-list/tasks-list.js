const addTaskButton = document.getElementById('headerAddTaskButton')

addTaskButton.onclick = () => {
    document.querySelector('.modal-wrapper').classList.remove('hidden')
    document.querySelector('.header').classList.add('hidden')
    document.querySelector('.main').classList.add('modal-display')
}
