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
    firstRow.innerHTML = '';
    secondRow.innerHTML = '';
    thirdRow.innerHTML = '';

    const iterationAmount = Number(numbersButtons[1].value);
    const workTime = (iterationAmount * 2) * Number(numbersButtons[0].value);
    const shortBreakTime = ((iterationAmount * 2) - 2) * Number(numbersButtons[2].value);
    const minutesSum = workTime + shortBreakTime + Number(numbersButtons[3].value);
    const firstCycle = (workTime + shortBreakTime) / 2 + (Number(numbersButtons[3].value));

    let bottomTime = 0;

    for (let i = 0; i < iterationAmount * 2; i++) {
        const iteration = document.createElement('div');
        iteration.classList.add('work');
        iteration.style.height = "10px";
        iteration.style.width = ((Number(numbersButtons[0].value) / minutesSum) * 100) + '%';
        secondRow.appendChild(iteration);

        if (i < 3) {
            const topPoint = document.createElement('div');
            topPoint.classList.add('cycle__top-elem');
            firstRow.appendChild(topPoint);
            const text = document.createElement('span');
            const point = document.createElement('div');
            text.classList.add('cycle__top-text');
            topPoint.appendChild(text);
            point.classList.add('cycle__point');
            topPoint.appendChild(point);

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
            const bottomPoint = document.createElement('div');
            bottomPoint.classList.add('cycle__bottom-elem');
            thirdRow.appendChild(bottomPoint);
            const text = document.createElement('span');
            const point = document.createElement('div');
            text.classList.add('cycle__bottom-text');
            bottomPoint.appendChild(text);
            point.classList.add('cycle__point');
            bottomPoint.appendChild(point);
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
            const shortBreak = document.createElement('div');
            shortBreak.classList.add('other');
            shortBreak.style.height = "10px";
            shortBreak.style.width = ((Number(numbersButtons[2].value) / minutesSum) * 100) + '%';
            secondRow.appendChild(shortBreak);
        }
        if (i == iterationAmount - 1) {
            const longBreak = document.createElement('div');
            longBreak.classList.add('hobby');
            longBreak.style.height = "10px";
            longBreak.style.width = ((Number(numbersButtons[3].value) / minutesSum) * 100) + '%';
            secondRow.appendChild(longBreak);
        }
    }
}
createCycle();