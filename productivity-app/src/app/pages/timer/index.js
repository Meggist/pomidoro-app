import Header from "../../components/header/header";

window.addEventListener('timer_render', async(event) => {
    event.detail.handler('timer', 'Timer').then(() => {
        const header = new Header('Timer')
    })
})