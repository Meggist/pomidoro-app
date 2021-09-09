import {dataBase} from "../../firebase";
import {eventBus} from "../../eventBus";

class CycleModel {
    constructor() {
        this.defaultValues = {
            workTime: {
                value: 25,
                title: 'Work time',
                type: 'work',
                min: 15,
                max: 25,
                step: 5
            },
            workIteration: {
                value: 5,
                title: 'Work iteration',
                type: 'other',
                min: 2,
                max: 5,
                step: 1
            },
            shortBreak: {
                value: 5,
                title: 'Short break',
                type: 'education',
                min: 3,
                max: 5,
                step: 1
            },
            longBreak: {
                value: 30,
                title: 'Long break',
                type: 'hobby',
                min: 15,
                max: 30,
                step: 5
            }
        }
        this.countersValues = Object.assign({}, this.defaultValues)
    }

    getValues = () => {
        const updateValues = ({workTime, workIteration, shortBreak, longBreak}) => {
            this.countersValues.workTime.value = workTime
            this.countersValues.workIteration.value = workIteration
            this.countersValues.shortBreak.value = shortBreak
            this.countersValues.longBreak.value = longBreak
        }
        dataBase.getFieldFromDB('cycleData')
            .then(data => {
                if (data) {
                    updateValues(data)
                }
            })
            .then(() => eventBus.publish('getCycleData', this.countersValues))
    }

    pushValues = values => dataBase.updateField('cycleData', values)
}

export default CycleModel