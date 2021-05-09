const alert = require('alert')

const db = require('./db')
const textFormats = require('../view/textFormats')
const getAccessToken = require('./tokens').getAccessToken

let accuseAttemptCount = 0

async function getIndividualAccusationOptions(option) {
    let answerList = []
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({})
        .project({ "room": 1, "character": 1, "weapon": 1, "_id": 0 })
        .forEach(document => answerList
            .push(textFormats.skipEmptyValues(document[option])))
    return answerList.filter(n=>n)
}

async function getAllAccusationOptions() {
    const characterOptions = await getIndividualAccusationOptions("character")
    const weaponOptions = await getIndividualAccusationOptions("weapon")
    const roomOptions = await getIndividualAccusationOptions("room")
    return [{character: characterOptions }, {weapon: weaponOptions }, {room: roomOptions }]
}


async function deleteAccusations() {
    const usersCollection = await db.getCollection("accusations")
    await usersCollection.deleteMany({})
}

async function addAccusations(selectedAccuseOptions) {
    const accusationsCollection = await db.getCollection("accusations")
    await accusationsCollection.insertOne(selectedAccuseOptions)
}

async function findAccused(request, response) {
    accuseAttemptCount++
    let lastAccusation = []
    let currentKiller = []
    const currentAccuseCountUser = getAccessToken(request, response).accuseCount
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
        response.json({ count: currentAccuseCountUser + accuseAttemptCount})
    } else {
        alert(`Sorry, that's not correct. Please, try again`)
        response.redirect("http://localhost:3000/accuse")
    }
    deleteAccusations()
}

function getAccuseAttemptCount() {
    return accuseAttemptCount
}

function resetAccuseAttemptCount() {
    return accuseAttemptCount = 0
}

module.exports = {
    findAccused,
    deleteAccusations,
    addAccusations,
    resetAccuseAttemptCount,
    getAccuseAttemptCount,
    getIndividualAccusationOptions,
    getAllAccusationOptions,
}