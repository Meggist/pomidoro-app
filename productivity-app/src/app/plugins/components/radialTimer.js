(function ($) {
    let interval

    $.fn.radialTimer = function ({content, time, onTimeout, showFull, renderInterval}) {
        clearInterval(interval)
        const insideCircle = this.find('.timer__cycle--inside')
        const text = this.find('.timer__text')
        const circleHtml = '<circle class="timer__line" r="7.4375rem" cy="7.4375rem" cx="7.4375rem"/>'

        if (content && showFull === false) {
            text.text(content)
            return this
        }

        insideCircle.html(circleHtml)

        //time *= 60
        const circleLength = 46.7075
        let i = 0
        interval = setInterval(() => {
            if (i === time) {
                clearInterval(interval)
                onTimeout()
                return
            }
            this.find('.timer__line').css('stroke-dashoffset', circleLength - ((i + 1) * circleLength / time) + 'rem')
            i++
        }, 1000)


        return this
    }
}($))