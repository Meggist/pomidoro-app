import Header from "../../components/header/header";
import template from './reports.hbs';
import {router} from "../../router";

class Reports {
    constructor() {
        router.changeDefaultRoute()
        document.body.innerHTML = template()
        const header = new Header('Reports')
    }
}

export default Reports