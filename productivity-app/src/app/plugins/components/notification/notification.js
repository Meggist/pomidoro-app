import generateTemplate from './notification.hbs'

(function ($) {
    let notificationTimeout = null
    $.fn.notification = function (options) {
        const removeNotification = () => {
            const notificationContainer = this.find('.tasks__notification')
            if (notificationContainer.length) {
                notificationContainer.remove()
            }
        }

        if (options === 'clean') {
            clearInterval(notificationTimeout)
            removeNotification()
            return this
        }

        const {type} = options
        const backgrounds = {
            info: 'education',
            error: 'urgent',
            success: 'low',
            warning: 'high'
        }

        if (!options.showTime) {
            options.showTime = '5000'
        }

        removeNotification()
        options.background = backgrounds[type]
        const html = generateTemplate(options)
        this.append(html)
        this.find('.notification__close-icon').click(removeNotification)
        notificationTimeout = setTimeout(removeNotification, Number(options.showTime))

        return this
    }
})($)