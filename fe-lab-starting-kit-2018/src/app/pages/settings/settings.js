require('./settings.less');

const minusButtons = Array.from(document.querySelectorAll('.icon-minus.counter__button'));
const plusButtons = Array.from(document.querySelectorAll('.icon-add.counter__button'));
const numbersButtons = Array.from(document.querySelectorAll('.counter__number'));

for (let i = 0; i < 4; i++) {
    if (i = 0) {
        minusButtons[i].onclick = () => changeNumber(5, i, '-')
    }
}

const changeNumber = (step, position, operation) => {
    alert(step)
        //(operation === '+')?numbersButtons[position].innerHTML = 
}