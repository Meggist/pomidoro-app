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

function passToCallbackES6(...args) {
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
