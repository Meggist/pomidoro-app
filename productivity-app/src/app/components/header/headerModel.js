class HeaderModel {
    constructor(title) {
        this.title = title
        this.checkTitle(this.title)
    }

    checkTitle = (title) => {
        if (title !== 'Daily Task List') {
            this.addTaskButton = 'hidden'
            this.trash = 'hidden'
        }

        if (title === 'Timer') {
            this.titleState = 'hidden'
        }

    }
}

export default HeaderModel