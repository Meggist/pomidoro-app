import Header from "../../components/header/header";
import template from './settings.hbs';
import {router} from "../../router";

class Settings {
    constructor() {
        router.changeDefaultRoute()
        document.body.innerHTML = template()
        const header = new Header('Settings')
    }
}

export default Settings