import template from './globalList_tmpl.hbs'

class GlobalListView {
    constructor(taskCollection) {
        this.taskCollection = taskCollection
        this.htmlTasks = this.taskCollection.view.htmlTasks
    }

    render = tasks => {
        const ids = tasks.map(item => item.id)
        this.htmlTasks = this.htmlTasks.filter(string => ids.find(id => string.includes(`${id}`)))
        console.log(this.htmlTasks)
    }
}

export default GlobalListView