const investigation = require('./investigation')
const rooms = require('./data').rooms
const textFormat = require('../view/textFormat')
let roomsList = []


for (room in rooms) {
    investigation.createRoom(rooms[room].id, rooms[room].character, rooms[room].weapon, rooms[room].passage)
}


for (room in investigation.roomsById) {
    roomsList.push(textFormat.textLink(room,`/rooms/${room}`))
}

module.exports = { roomsList }