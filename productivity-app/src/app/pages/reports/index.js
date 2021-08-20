window.addEventListener('reports_render', async(event) => {
    event.detail.handler('reports', 'Reports').then(() => {
        require('../../components/header/header');
    })
})