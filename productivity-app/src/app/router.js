import TaskList from "./pages/tasks-list/tasksList";
import Reports from "./pages/reports/reports";
import Timer from "./pages/timer/timer";
import Settings from "./pages/settings/settings";
import {dataBase} from "./firebase";
import {eventBus} from "./eventBus";

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
    router.add('settings/pomodoros', () => new Settings('pomodoros'))
    router.add('settings/categories', () => new Settings('categories'))
    router.add('timer', () => new Timer())
    router.add('reports/day/tasks', () => new Reports('day', 'tasks'))
    router.add('reports/day/pomodoros', () => new Reports('day', 'pomodoros'))
    router.add('reports/week/tasks', () => new Reports('week', 'tasks'))
    router.add('reports/week/pomodoros', () => new Reports('week', 'pomodoros'))
    router.add('reports/month/tasks', () => new Reports('month', 'tasks'))
    router.add('reports/month/pomodoros', () => new Reports('month', 'pomodoros'))
}

