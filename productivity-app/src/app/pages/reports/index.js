import Header from "../../components/header/header";

window.addEventListener('reports_render', async(event) => {
    event.detail.handler('reports', 'Reports').then(() => {
        const header = new Header('Reports')
    })
})