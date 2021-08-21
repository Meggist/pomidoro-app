import Modal from "../../components/modal/modal";
const addTaskButtons = Array.from(document.querySelectorAll('.headerAddTaskButton'))

addTaskButtons.forEach(item => {
    item.onclick = () => {
        const addTaskModal = new Modal('add')
        document.querySelector('.modal-wrapper').classList.remove('hidden')
        document.querySelector('.header').classList.add('hidden')
        document.querySelector('.main').classList.add('modal-display')
    }
})
