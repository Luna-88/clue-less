const textFormat = require('../view/textFormats')
const db = require('./db')
let roomList = []


function inspectRoom(room) {
    const enter = `You have entered the ${room.room}...`
    const options = [textFormat.textLink(`
        Ask a Question`, `http://localhost:3000/rooms/${room.room}/questions`),
        `or`,
        textFormat.textLink(`
        Accuse`, `../accuse`)].join(' ')
    const back = textFormat.paragraphFormat(textFormat.textLink(`Go Back`, 'http://localhost:3000/rooms'))
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
    await roomsCollection.find({})
        .project({ "room": 1, "_id": 0 })
        .forEach(document => roomList
            .push(textFormat.paragraphFormat(textFormat.textLink(
            document.room, `/rooms/${document.room}`))))
    return roomList.join('')
}


module.exports = {
    inspectRoom,
    listRooms,
}