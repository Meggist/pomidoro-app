import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBkeTWRIYExVplCCzn_fJlf0d-uXgqjvSk",
    authDomain: "productivity-app-eec16.firebaseapp.com",
    databaseURL: "https://productivity-app-eec16-default-rtdb.firebaseio.com",
    projectId: "productivity-app-eec16",
    storageBucket: "productivity-app-eec16.appspot.com",
    messagingSenderId: "871367433061",
    appId: "1:871367433061:web:c6d1be019bd612564e5f8c"
}

firebase.initializeApp(firebaseConfig)


export let db = firebase.database()
export const deleteDBField = field => db.ref(field).remove()
export const insertDataToDB = (path, data) => db.ref(path).update(data)
export const getFieldFromDB = (path) => db.ref(path).get().then(doc => doc.val())





