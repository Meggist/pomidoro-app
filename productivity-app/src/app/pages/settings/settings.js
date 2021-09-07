import Header from "../../components/header/header";
import template from './settings.hbs';
import {router} from "../../router";
import SettingsView from "./settingsView";
import SettingsController from "./settingsController";

class Settings {
    constructor(state) {
        router.changeDefaultRoute()
        this.view = new SettingsView(state)
        this.controller = new SettingsController(this.view)
    }


}

export default Settings