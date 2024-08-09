import { initializeApp } from "firebase/app";
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAOSW5Gtj5qUJdeyEuyfZJyzBumvpk7ls0",
    authDomain: "leads-tracker-app-b1684.firebaseapp.com",
    databaseURL: "https://leads-tracker-app-b1684-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "leads-tracker-app-b1684",
    storageBucket: "leads-tracker-app-b1684.appspot.com",
    messagingSenderId: "350491755719",
    appId: "1:350491755719:web:6cfc8a85a19d18744eeae2"
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = "" 
})