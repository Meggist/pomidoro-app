function passToCallbackES5() {
    let args = Array.from(arguments);

    try {
        if(typeof args[args.length - 1] !== 'function')
        {
            throw new Error('Callback function is reqired as last argument')
        }
    } catch (err) {
        console.error(err.message);
        return err.message;
    }

    let callbackArgs = args.slice(0, args.length-1);

    return args[args.length-1].apply(null, callbackArgs);
}

const passToCallbackES6 = (...args) => {
    try {
        if(typeof args[args.length - 1] !== 'function')
        {
            throw new Error('Callback function is reqired as last argument')
        }
    } catch (err) {
        console.error(err.message);
        return err;
    }

    let callbackArgs = args.slice(0, args.length-1);
    return args[args.length-1](...callbackArgs);
}

console.log(passToCallbackES5(4, 5, 2, (...nums) => nums.reduce((prev, cur) => prev + cur, 0))); //returns 11
console.log(passToCallbackES5(3, 4, 1, function(...nums){console.log(nums)})); //logs [3, 4, 1], returns undefined

