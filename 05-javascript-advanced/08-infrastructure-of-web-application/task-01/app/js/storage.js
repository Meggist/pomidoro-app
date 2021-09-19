class Storage {
    static LOCAL_STORAGE = localStorage
    static SESSION_STORAGE = sessionStorage
    static _IDB_CONNECTION = window.indexedDB
        .open('storage', 4)
}

const storage = new Storage()

const runCallback = (callback, value) => {
    if (callback) {
        callback(value)
    }
}