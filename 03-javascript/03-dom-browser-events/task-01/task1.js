const createCounter = (startCount, incrementor) => {
    if (!startCount) {
        startCount = 0;
    }

    if (!incrementor) {
        incrementor = 1;
    }

    try {
        if ( typeof startCount !== 'number' || typeof incrementor !== 'number') {
            throw new Error('Only numeric params are allowed')
        }
    } catch (error) {
        console.error(error.message)
        return error
    }

        let sum = startCount;
        let isFirstCall = true;

        return function counter() { // I don't use an arrow function because I must create method

            counter.resetCounter = () => {
                sum = startCount;
                isFirstCall = true;
            }

            if (isFirstCall === true) {
                isFirstCall = false;
                return startCount;
            } else {
                return sum+=incrementor
            }
        }
}

const func1 = createCounter();
console.log(func1());
console.log(func1());
console.log(func1());
console.log(func1());
console.log(func1.resetCounter());
console.log(func1());
console.log(func1());
console.log(func1());


console.log('......')

const func2 = createCounter(100,25);
console.log(func2());
console.log(func2());
console.log(func2());
console.log(func2());
console.log(func2.resetCounter());
console.log(func2());
console.log(func2());
console.log(func2());




