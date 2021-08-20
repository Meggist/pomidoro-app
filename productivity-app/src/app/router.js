require("babel-polyfill");

import { deleteDBField } from './firebase'
alert(history.pushState)
const Router = {
    routes: [],
    mode: null,
    root: '/',
    config: function(options) {
        this.mode = options && options.mode && options.mode == 'history' &&'history'
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/'
        return this
    },
    listen: function() {
        var self = this
        var current = self.getFragment()
        var fn = function() {
            if (current !== self.getFragment()) {
                current = self.getFragment()
                self.check(current)
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50)
        return this
    },
    getFragment: function() {
        let fragment = '';
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search))
            fragment = fragment.replace(/\\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment
        } else {
            const match = window.location.href.match(/#(.*)$/)
            fragment = match ? match[1] : ''
        }
        return this.clearSlashes(fragment)
    },
    clearSlashes: function(path) {
        return path.toString().replace(/\\$/, '').replace(/^\\/, '');
    },
    add: function(re, handler) {
        if (typeof re == 'function') {
            handler = re
            re = ''
        }
        this.routes.push({ re: re, handler: handler })
        return this
    },
    remove: function(param) {
        for (let i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1)
                return this
            }
        }
        return this;
    },
    flush: function() {
        this.routes = []
        this.mode = null
        this.root = '/'
        return this
    },
    check: function(f) {
        let fragment = f || this.getFragment();
        for (let i = 0; i < this.routes.length; i++) {
            let match = fragment.match(this.routes[i].re)
            if (match) {
                match.shift()
                this.routes[i].handler.apply({}, match)
                return this
            }
        }
        return this
    }
}
const loadPage = async(page, title) => {
    const response = await fetch(`static/${page}.html`);
    const resHtml = await response.text();
    document.write(resHtml);
    setTimeout(() => {
        window.dispatchEvent(new CustomEvent('header_render', {
            bubbles: true,
            cancelable: true,
            detail: { pageTitle: title }
        }))
    }, 500)
    console.log(history);
};
const renderPage = (page, title) => {
    window.dispatchEvent(new CustomEvent(`${page}_render`, {
        bubbles: true,
        cancelable: true,
        detail: { handler: loadPage }
    }))
}


window.addEventListener('load', () => {
    const curUrl = window.location.pathname.split("/")[1]
    Router.check(curUrl).listen()
})

if (!sessionStorage.noFirstVisit) {
    deleteDBField('cycleData')
    Router.add(function() {
        renderPage('firstPage')
    })
    window.addEventListener('firstPage_render', async(event) => {
        event.detail.handler('firstPage', 'firstLoad').then(() => {
            require('./components/header/header')
        })
    })
    sessionStorage.noFirstVisit = "1"
    console.log('first visit')

} else {
    console.log('new_visits');
    Router.config({ mode: 'history' })
    Router
        .add(/settings/, function() {
            renderPage('settings')
        })
        .add(/reports/, function() {
            renderPage('reports')
        })
        .add(/timer/, function() {
            renderPage('timer')
        })

    .add(function() {
        renderPage('task-list')
    })
}