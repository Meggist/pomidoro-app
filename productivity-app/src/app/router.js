import TaskList from "./pages/tasks-list/tasksList";
import Reports from "./pages/reports/reports";
import Timer from "./pages/timer/timer";
import Settings from "./pages/settings/settings";
import {dataBase} from "./firebase";

class Router {
    constructor() {
        this.routes = []
        this.root = '/'

        this.listen()
    }

    clearSlashes = path => path
        .toString()
        .replace(/\/$/, '')
        .replace(/^\//, '')

    add = (path, callback) => this.routes.push({path, callback})


    getFragment = () => {
        let fragment = ''

        fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search))
        fragment = fragment.replace(/\?(.*)$/, '')
        fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment

        return this.clearSlashes(fragment)
    }

    listen = () => {
        clearInterval(this.interval)
        this.interval = setInterval(this.interval, 50)
    }

    interval = () => {
        if (this.current === this.getFragment()) {
            return
        }
        this.current = this.getFragment()
        this.routes.forEach(route => {
            if (this.current === route.path) {
                route.callback()
            }
        })
    }

    changeDefaultRoute = () => {
        if (this.routes.find(item => item.callback === createFirstPage)) {
            this.routes = this.routes.filter(item => item !== {path: '', callback: createFirstPage})
            router.add('', () => new TaskList())
        }
    }
}


export const router = new Router()

const createFirstPage = () => new TaskList('first')

if (!sessionStorage.isNoFirstVisit) {
    dataBase.deleteDBField('cycleData')
    router.add('', createFirstPage)
    sessionStorage.isNoFirstVisit = true
} else {
    router.add('', () => new TaskList())
    router.add('task-list', () => new TaskList())
    router.add('reports', () => new Reports())
    router.add('settings', () => new Settings())
    router.add('timer', () => new Timer())
}


