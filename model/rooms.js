const db = require('./db')
const textFormats = require('../view/textFormats')
const inspectionDisplay = require('../components/displays/roomInspectionDisplay')
const gridDisplay = require('../components/displays/roomGridDisplay')

async function getRoomList() {
    let roomList = []
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({})
        .project({ "_id": 0 })
        .forEach(document => roomList
            .push(`
            <div class="grid-item">
                ${textFormats.displayParagraphFormat(textFormats.setTextLink(textFormats.skipEmptyValues(document.room), `/rooms/${document.room}`))}
            </div>
            `))
    return gridDisplay.displayRoomGrid(roomList)
}

async function inspectRooms(request) {
    let roomInspection = []
    const roomId = request.params.roomId
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({ room: roomId })
        .project({ "_id": 0 })
        .forEach(room => { 
            if (room.character.length === 0) {
                ifCharacter = `There is no one inside...`
                options = ""
            } else {
                ifCharacter = `You find ${room.character} pacing in inside. `
                options = [textFormats.setTextLink(`Ask a Question`, `http://localhost:3000/rooms/${room.room}/questions`), `or`,
                textFormats.setTextLink(`Accuse`, `../accuse`)].join(' ')
            }
            if (room.weapon.length === 0) {
                ifWeapon = `You don't see a potential weapon`
            } else {
                ifWeapon = `You notice something is out of place, a ${room.weapon}.`
            }
            roomInspection.push(inspectionDisplay.roomInspectionDisplay(room, ifCharacter, ifWeapon, options))
        })
        return roomInspection.join('')
}

module.exports = {
    inspectRooms,
    getRoomList,
}