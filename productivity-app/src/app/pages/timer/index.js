window.addEventListener('timer_render', async(event) => {
    event.detail.handler('timer', 'Timer').then(() => {
        require('../../components/header/header');
        console.log('render call')
    })
})