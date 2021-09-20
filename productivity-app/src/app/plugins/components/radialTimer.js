(function ($) {
    let interval = null

    $.fn.radialTimer = function ({content, time, onTimeout, showFull, renderInterval}) {
        clearInterval(interval)
        const insideCircle = this.find('.timer__cycle--inside')
        const text = this.find('.timer__text')
        const circleHtml = '<circle class="timer__line" r="7.4375rem" cy="7.4375rem" cx="7.4375rem"/>'
        const circleLength = 46.7075

        if (content && showFull === false) {
            text.text(content)
            return this
        }

        if (content && showFull === true) {
            this.text(content())
            return this
        }

        insideCircle.html(circleHtml)

        time *= 60

        let currentTime = 0
        interval = setInterval(() => {
            if (currentTime === time) {
                clearInterval(interval)
                onTimeout()
                return
            }

            if (currentTime % renderInterval === 0) {

                content(this, time, currentTime)
            }

            this.find('.timer__line')
                .css('stroke-dashoffset', circleLength - ((currentTime + 1) * circleLength / time) + 'rem')
            currentTime++
        }, 1000)
        content(this, time, currentTime)
        return this
    }
}($))