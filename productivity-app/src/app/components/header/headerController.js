class HeaderController {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.body = document.body
        this.render(this.model, this.body)
    }

    render = (data, target) => this.view.append(this.view.render(data), target)
}

export default HeaderController