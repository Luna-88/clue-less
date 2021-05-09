const db = require('./db')

async function getRoomList() {
    let roomList = []
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({})
        .project({ "_id": 0 })
        .forEach(document => roomList
            .push(document.room))
    return JSON.parse(JSON.stringify(Object.assign({}, roomList)))
}

async function inspectRooms(request) {
    let roomInspection = []
    const roomId = request.params.roomId
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({ room: roomId })
        .project({ "_id": 0 })
        .forEach(document => {
            if (document.character.length === 0) {
                ifCharacter = 'There is no one inside...'
                options = ""
            } else {
                ifCharacter = `You find ${document.character} pacing in inside. `
                options = ['Ask a Question', 'Accuse']
            }
            if (document.weapon.length === 0) {
                ifWeapon = `You don't see a potential weapon`
            } else {
                ifWeapon = `You notice something is out of place, a ${document.weapon}.`
            }
            roomInspection.push({
                room: document.room,
                character: ifCharacter,
                weapon: ifWeapon,
                option: options
            })
        })
    return roomInspection[0]
}

module.exports = {
    inspectRooms,
    getRoomList,
}