storage.save = (key, value, storageType, callback) => {

    if (!key) {
        throw new Error('key is necessary parameter')
    }

    if (!value) {
        throw new Error('value is necessary parameter')
    }

    if (storageType === Storage.INDEXED_DB &&
        typeof callback !== 'function') {
        throw new Error('if storageType is INDEXED_DB, ' +
            'last parameter should be function')
    }

    if (storageType === Storage.INDEXED_DB) {
        Storage._IDB_CONNECTION.onupgradeneeded =
            ({target}) => {
            const db = target.result;
            const objectStore = db.createObjectStore(
                'customers',
                {
                    keyPath: 'key',
                }
            );
            objectStore.createIndex('key',
                'key', {
                unique: true,
            });
            objectStore.add({value: value, key: key});
        };

        Storage._IDB_CONNECTION.onsuccess = ({target}) => {
            const db = target.result;

            let tx = db.transaction(['customers'],
                'readwrite');
            let store = tx.objectStore('customers');

            let item = {value: value, key: key};
            store.add(item);
               callback()

        }
    }

    if (storageType === Storage.LOCAL_STORAGE
        || !storageType) {
        Storage.LOCAL_STORAGE.setItem(key, value)
        runCallback(callback, value)
    }

    if (storageType === Storage.SESSION_STORAGE) {
        Storage.SESSION_STORAGE.setItem(key, value)
        runCallback(callback, value)
    }
}