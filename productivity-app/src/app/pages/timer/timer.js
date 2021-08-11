const minusButtons = Array.from(document.getElementsByClassName('icon-minus'));
const plusButtons = Array.from(document.getElementsByClassName('icon-add'));
const numbersButtons = Array.from(document.getElementsByClassName('counter__number'));
const defaultValues = numbersButtons.map(e => Number(e.value));

const counter = {
    changeNumber: (step, position, operation, edge) => {
        if (Number(numbersButtons[position].value) === edge) {
            return
        } else {
            if (operation === '-') {
                numbersButtons[position].value = Number(numbersButtons[position].value) - step
            } else {
                numbersButtons[position].value = Number(numbersButtons[position].value) + step
            }
            createCycle();
        }
    },

    returnToDefault: () => numbersButtons.forEach((elem, index) => {
        elem.value = defaultValues[index];
        createCycle();
    })
}

for (let i = 0; i < 4; i++) {
    switch (i) {
        case 0:
            minusButtons[i].onclick = () => counter.changeNumber(5, i, '-', 15);
            plusButtons[i].onclick = () => counter.changeNumber(5, i, '+', 25);
            break;
        case 1:
            minusButtons[i].onclick = () => counter.changeNumber(1, i, '-', 2);
            plusButtons[i].onclick = () => counter.changeNumber(1, i, '+', 5);
            break;

        case 2:
            minusButtons[i].onclick = () => counter.changeNumber(1, i, '-', 3);
            plusButtons[i].onclick = () => counter.changeNumber(1, i, '+', 5);
            break;

        case 3:
            minusButtons[i].onclick = () => counter.changeNumber(5, i, '-', 15);
            plusButtons[i].onclick = () => counter.changeNumber(5, i, '+', 30);
            break;
    }
}

const firstRow = document.getElementsByClassName('cycle__first-row')[0];
const secondRow = document.getElementsByClassName('cycle__second-row')[0];
const thirdRow = document.getElementsByClassName('cycle__third-row')[0];


const createCycle = () => {
    const iterationAmount = Number(numbersButtons[1].value);
    const workTime = (iterationAmount * 2) * Number(numbersButtons[0].value);
    const shortBreakTime = ((iterationAmount * 2) - 2) * Number(numbersButtons[2].value);
    const minutesSum = workTime + shortBreakTime + Number(numbersButtons[3].value);
    const firstCycle = (workTime + shortBreakTime) / 2 + (Number(numbersButtons[3].value));

    const createGraphElem = (color, index) => {
        const elem = document.createElement('div');
        elem.classList.add(color);
        elem.style.height = "10px";
        elem.style.width = ((Number(numbersButtons[index].value) / minutesSum) * 100) + '%';
        secondRow.appendChild(elem);
    }

    const createInfoElem = (side, row) => {
        const container = document.createElement('div');
        container.classList.add(`cycle__${side}-elem`);
        row.appendChild(container);
        const text = document.createElement('span');
        const point = document.createElement('div');
        text.classList.add(`cycle__${side}-text`);
        container.appendChild(text);
        point.classList.add('cycle__point');
        container.appendChild(point);
        return arr = [container, text, point];
    }

    firstRow.innerHTML = '';
    secondRow.innerHTML = '';
    thirdRow.innerHTML = '';

    let bottomTime = 0;

    for (let i = 0; i < iterationAmount * 2; i++) {

        createGraphElem('work', 0)

        if (i < 3) {
            const [topPoint, text, point] = createInfoElem('top', firstRow)

            switch (i) {
                case 0:
                    text.innerHTML = '0m';
                    break;
                case 1:
                    text.innerHTML = `First cycle: ${Math.floor(firstCycle/60)}h ${firstCycle%60}m`;
                    topPoint.style.marginLeft = ((firstCycle / minutesSum) * 100) + "%";
                    break;

                case 2:
                    topPoint.style.justifyContent = "flex-end";
                    point.style.float = "right";
                    text.innerHTML = `${Math.floor(minutesSum/60)}h ${minutesSum%60}m`;
                    topPoint.style.marginLeft = (((minutesSum - firstCycle) / minutesSum) * 100) + "%";
                    break;
            }
        }

        if (i < Math.floor(minutesSum / 30)) {
            const [bottomPoint, text, point] = createInfoElem('bottom', thirdRow);

            bottomTime += 30;
            bottomPoint.style.marginLeft = ((30 / minutesSum) * 100) + "%";
            if (i == 0) {
                text.innerHTML = '30m';
                text.classList.add('cycle__bottom-display');
                point.classList.add('cycle__bottom-display');
            } else {
                text.innerHTML = `${Math.floor(bottomTime/60)}h`;
                if (bottomTime % 60 === 30) {
                    text.innerHTML += ' 30m'
                    text.classList.add('cycle__bottom-display');
                    point.classList.add('cycle__bottom-display');
                }
            }
        }

        if (i !== iterationAmount - 1 && i !== (iterationAmount * 2) - 1) {
            createGraphElem('other', 2);
        }

        if (i == iterationAmount - 1) {
            createGraphElem('hobby', 3);
        }
    }
}
createCycle();