const textFormat = require('../view/textFormat')
const db = require('./db')
let roomList = []


function inspectRoom(room) {
    const enter = `You have entered the ${room.name}...`
    const options = [textFormat.textLink(`Ask a Question`, './questions'),`or`,textFormat.textLink(`Accuse`, './Accuse')].join(' ')
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


db.getCollection('rooms').then((rooms) => {
    let everyRoom = rooms.find({})
    return everyRoom.toArray()
        .then((everyRoomArray) => {
            console.log(everyRoomArray)
            for (room in everyRoomArray) {
                console.log(room)
                roomList.push(textFormat.textLink(everyRoomArray[room].name, `/rooms/${everyRoomArray[room].name}`))
            }
        })
})



module.exports = { roomList, inspectRoom }