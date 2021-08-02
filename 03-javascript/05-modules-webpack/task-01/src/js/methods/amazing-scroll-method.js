export function scrollToElement(el, speed) {
    const $body = $('html, body');
    let offset,
        elOffset,
        elHeight,
        windowHeight;

    elOffset = el.offset().top;
    elHeight = el.height();
    windowHeight = $(window).height();

    if (elHeight < windowHeight) {
        offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
    }
    else {
        offset = elOffset;
    }

    $body.animate({
        scrollTop: offset
    }, speed)
}