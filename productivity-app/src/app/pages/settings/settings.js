import Header from "../../components/header/header";
import template from './settings.hbs';

class Settings {
    constructor() {
        document.body.innerHTML = template()
        const header = new Header('Settings')
    }
}

export default Settings