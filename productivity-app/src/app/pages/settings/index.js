window.addEventListener('settings_render', async(event) => {
    event.detail.handler('settings', 'Settings').then(() => {
        require('../../components/header/header')
        require('../../components/cycle/cycle')
        require('./settings')
    })
})