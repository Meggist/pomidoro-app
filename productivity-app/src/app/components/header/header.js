import HeaderModel from "./headerModel";
import HeaderView from "./headerView";
import HeaderController from "./headerController";

class Header {
    constructor(title) {
        this.model = new HeaderModel(title)
        this.view = new HeaderView()
        this.controller = new HeaderController(this.model, this.view)
    }
}

export default Header