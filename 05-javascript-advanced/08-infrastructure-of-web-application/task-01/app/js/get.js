storage.get = (key, storageType, callback) => {
    if (!key) {
        throw new Error('key is necessary parameter')
    }
    let value

    if (storageType === Storage.LOCAL_STORAGE ||
        !storageType) {
        value = Storage.LOCAL_STORAGE.getItem(key)
        runCallback(callback, value)
        return value
    }

    if (storageType === Storage.SESSION_STORAGE) {
        value = Storage.SESSION_STORAGE.getItem(key)
        runCallback(callback, value)
        return value
    }

    if (storageType === Storage.INDEXED_DB &&
        typeof callback !== 'function') {
        throw new Error('callback is required')
    }

    if (storageType === Storage.INDEXED_DB) {
        let value = Storage._IDB_CONNECTION.get(key)
        value.onsuccess = event => {
            runCallback(callback, event.target.result)
        }}
}

