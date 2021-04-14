const textFormat = require('../view/textFormat')
const db = require('./db')
let roomList = []
let questionList = []


function inspectRoom(room) {
    const enter = `You have entered the ${room.name}...`
    const options = [textFormat.textLink(`Ask a Question`, '../questions'), `or`, textFormat.textLink(`Accuse`, '../Accuse')].join(' ')
    const back = textFormat.paragraphFormat(textFormat.textLink(`Go Back`, './'))
    if (room.character.length === 0 && room.weapon.length > 0) {
        return textFormat.paragraphFormat(`${enter}
                No one is here...
                You look around...
                There is a ${room.weapon} in the room`)
            + back
    } else if (room.character.length > 0 && room.weapon.length === 0) {
        return textFormat.paragraphFormat(`${enter}
                You find ${room.character} pacing inside...`)
            + options
            + back
    } else if (room.character.length > 0 && room.weapon.length > 0) {
        return textFormat.paragraphFormat(`${enter}
                You find ${room.character} pacing in the room...
                There is a ${room.weapon} as well`)
            + options
            + back
    }
}


async function listRooms() {
    roomList = []
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({}).project({ "name": 1, "_id": 0 })
    .forEach(document => roomList
        .push(textFormat.paragraphFormat(textFormat.textLink(
            document.name, `/rooms/${document.name}`))))
    return roomList.join('')
}

async function selectQuestion() {
    questionList = []
    const questionsCollection = await db.getCollection("questions")
    await questionsCollection.find({}).project({"_id":0})
    .forEach(document=>questionList
        .push(textFormat.bulletSelection(document.question,document.number)))
    return questionList.join('')
}





module.exports = { 
    inspectRoom, 
    listRooms,
    selectQuestion }