const alert = require('alert')
const db = require('./db')
const textFormats = require('../view/textFormats')
const users = require('../model/users')
const scores = require('./scores')

let accuseAttemptCount = 0

async function getAnswerOptions(option) {
    let answerList = []
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({})
        .project({ "answers": 0, "_id": 0 })
        .forEach(document => answerList
            .push(textFormats.skipEmptyValues(document[option])))
    return answerList.join("")
}

async function getAnswerSelects(option, label) {
    const options = await getAnswerOptions(option)
    return `
    <div style="padding:5px">
        <label for="${option}">${label}</label><br>
        <select name="${option}" id="${option}" style="height:40px; width:250px font-family:futura; font-size:20px">
            ${options}
        </select><br>
    </div>
    `
}

async function generateAccusedForm() {
    const selectCharacters = await getAnswerSelects("character", "Who killed him?")
    const selectWeapons = await getAnswerSelects("weapon", "What weapon did they use?")
    const selectRooms = await getAnswerSelects("room", "Where did it happen?")
    return `
    <head>
    <style>
        .accuseButton { 
            text-align: center 
        }
    </style>
    </head>
    <body style="font-family:futura; font-size:30px; text-align:left">
    ${textFormats.displayGameTitle()}
        <div style="margin:auto;width:345px;border:3px solid grey;padding:10px">    
            <form action="http://localhost:3000/accuse" method="post">
                ${selectCharacters}
                ${selectWeapons}
                ${selectRooms}
                <div class="accuseButton">
                    <input type="submit" value="Accuse" style="margin:10px; height:40px;width:90px; font-family:futura; font-size:25px; text-align:center">
                </div>
            </form>
        </div>
        ${textFormats.displayParagraphFormat(textFormats.setTextLink(`Go Back to Rooms`, `http://localhost:3000/rooms/`))}
    </body>
    `
}

async function deleteAccusations() {
    const usersCollection = await db.getCollection("accusations")
    await usersCollection.deleteMany({})
}

async function addAccusations(selectedAccuseOptions) {
    const accusationsCollection = await db.getCollection("accusations")
    await accusationsCollection.insertOne(selectedAccuseOptions)
}

async function findAccused(response) {
    accuseAttemptCount = users.getCurrentAccuseCountUser()[0].accuseCount + 1
    let lastAccusation = []
    let currentKiller = []
    const accusationsCollection = await db.getCollection("accusations")
    const killersCollection = await db.getCollection("killers")
    await accusationsCollection.find({})
        .project({ "_id": 0 })
        .sort({ "_id": -1 })
        .limit(1)
        .forEach(document => lastAccusation.push(document))
    await killersCollection.find({})
        .project({ "_id": 0 })
        .forEach(document => currentKiller.push(document))
    if (JSON.stringify(lastAccusation[0]) === JSON.stringify(currentKiller[0])) {
        response.send(scores.generateWinnerMessage(accuseAttemptCount))
    } else {
        alert(`Sorry, that's not correct. Please, try again`)
        response.redirect("http://localhost:3000/accuse")
    }
    deleteAccusations()
}

function getAccuseCount() {
    return accuseAttemptCount
}

function resetAccuseCount() {
    return accuseAttemptCount = 0
}

module.exports = {
    findAccused,
    generateAccusedForm,
    getAccuseCount,
    deleteAccusations,
    addAccusations,
    resetAccuseCount,
}