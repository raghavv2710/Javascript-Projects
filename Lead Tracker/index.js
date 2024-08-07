import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"

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
    const snapshotValues = snapshot.val()
    // Challenge: Create a const called 'leads' which is an array containing the values inside of the snapshotValues object
    const leads = [Object.values(snapshotValues)]
    console.log(leads)
})

deleteBtn.addEventListener("dblclick", function() {
    
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = "" 
})