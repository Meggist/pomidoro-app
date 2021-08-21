import Header from "../../components/header/header";

window.addEventListener('settings_render', async(event) => {
    event.detail.handler('settings', 'Settings').then(() => {
        const header = new Header('Settings')
        require('../../components/cycle/cycle')
        require('./settings')
    })
})