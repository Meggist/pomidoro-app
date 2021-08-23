import {dataBase} from "./firebase";
import Header from "./components/header/header";

class Router {
    constructor() {
        this.routes = []
        this.mode = null
        this.root = '/'
    }

    config(options) {
        this.mode = options && options.mode && options.mode == 'history' &&'history'
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/'
        return this
    }
    listen() {
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
    }
    getFragment() {
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
    }
    clearSlashes(path) {
        return path.toString().replace(/\\$/, '').replace(/^\\/, '');
    }
    add(re, handler) {
        if (typeof re == 'function') {
            handler = re
            re = ''
        }
        this.routes.push({ re: re, handler: handler })
        return this
    }
    remove(param) {
        for (let i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1)
                return this
            }
        }
        return this;
    }
    flush() {
        this.routes = []
        this.mode = null
        this.root = '/'
        return this
    }
    check(f) {
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

const router = new Router()

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
    router.check(curUrl).listen()
})

if (!sessionStorage.noFirstVisit) {
    dataBase.deleteDBField('cycleData')
    router.add(function() {
        renderPage('firstPage')
    })
    window.addEventListener('firstPage_render', async(event) => {
        event.detail.handler('firstPage', 'firstLoad').then(() => {
             const header = new Header('Daily Task List')
        })
    })
    sessionStorage.noFirstVisit = "1"
} else {
    router.config({ mode: 'history' })
    router
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