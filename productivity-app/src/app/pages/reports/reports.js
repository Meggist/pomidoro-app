import Header from "../../components/header/header";
import template from './reports.hbs';

class Reports {
    constructor() {
        document.body.innerHTML = template()
        const header = new Header('Reports')
    }
}

export default Reports