import {dataBase} from "../../firebase";
import {numbersButtons} from "../../components/cycle/cycle";

const saveCycleDataButton = document.getElementById('saveCycleData')

saveCycleDataButton.onclick = () => {
    dataBase.db.ref('cycleData').update({
        'longBreak': numbersButtons[3].value,
        'shortBreak': numbersButtons[2].value,
        'workIteration': numbersButtons[1].value,
        'workTime': numbersButtons[0].value,
    })
}