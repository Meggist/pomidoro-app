import TaskList from "./pages/tasks-list/tasks-list";
import Reports from "./pages/reports/reports";
import Timer from "./pages/timer/timer";
import Settings from "./pages/settings/settings";

class Router {
    constructor() {
        this.routes = []
        this.root = '/'

        this.listen()
    }

    clearSlashes = path =>
        path
            .toString()
            .replace(/\/$/, '')
            .replace(/^\//, '')

    add = (path, callback) => {
        this.routes.push({path, callback})
    }

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

}

export const router = new Router()

router.add('', () => new TaskList())
router.add('task-list', () => new TaskList())
router.add('reports', () => new Reports())
router.add('settings', () => new Settings())
router.add('timer', () => new Timer())