function createCounter(startCount, incrementor) {
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

        return function counter() {

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




