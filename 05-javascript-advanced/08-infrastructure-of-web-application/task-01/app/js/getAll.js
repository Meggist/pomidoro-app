storage.getAll = (storageType, callback) => {
    let value

    if (storageType === Storage.LOCAL_STORAGE) {
        value = Object.entries(Storage.LOCAL_STORAGE)
        runCallback(callback, value)
        return value
    }

    if (storageType === Storage.SESSION_STORAGE) {
        value = Object.entries(Storage.SESSION_STORAGE)
        runCallback(callback, value)
        return value
    }

    if (storageType === Storage.INDEXED_DB &&
        typeof callback !== 'function') {
        throw new Error('callback is required')
    }

    if (storageType === Storage.INDEXED_DB) {
        let value = Storage._IDB_CONNECTION.getAll()
        value.onsuccess = event => {
            runCallback(callback, event.target.result)
        }}


    if (!storageType) {
        value = Object.entries(Storage.LOCAL_STORAGE)
        runCallback(callback, value)
        return value
    }
}
