const root = document.getElementById('root')
const rootModal = document.getElementById('root-modal')
let source = document.getElementById('template').innerHTML
let template = Handlebars.compile(source)
let modalSource = document.getElementById('modalWindow').innerHTML
let modalTemplate = Handlebars.compile(modalSource)
let html

const implementHTML = (date, target,template) => target.innerHTML = template(date)

const date = {
    navigation: [
        {text: 'Handlebars', href: '#'},
        {text: 'Dust', href: '#'},
        {text: 'Lodash', href: '#'}
    ],
}

implementHTML(date, root, template)

let xhr = new XMLHttpRequest();
xhr.open('GET', '../data/data.json')
xhr.send()

xhr.onload = () => {
    date.students = JSON.parse(xhr.response)
    implementHTML(date, root, template)

    const cards = Array.from(document.querySelectorAll('.card'))

    cards.forEach((item, index) => {
        const getInfo = item.querySelector('.get-info')

        item.onmouseover = () => {
            item.querySelector('.hover-wrapper').style.backgroundColor = 'dodgerblue'
            getInfo.style.display = 'block'
        }

        item.onmouseout = () => {
            item.querySelector('.hover-wrapper').style.backgroundColor = "#CCCCCC"
            getInfo.style.display = 'none'
        }

        getInfo.onclick = () => {
            implementHTML(date.students[index], rootModal, modalTemplate)

            document.querySelector('.modal').style.display = 'block'
            document.querySelector('.modal-wrapper').style.display = 'block'
            document.body.classList.add('modal-open')
            document.body.style.overflowY = 'hidden'

            const closeButton = Array.from(document.querySelectorAll('.close'))

            closeButton.forEach(item => {
                item.onclick = () => {
                    rootModal.innerHTML = ''
                    document.body.style.overflowY = 'auto'
                }
            })

        }
    })
}







