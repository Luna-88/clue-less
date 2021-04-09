const textFormat = require('../view/textFormat')
const db = require('./db')
let roomsList = []


db.getCollection('rooms').then((rooms) => {
    let everyRoom = rooms.find({})
    return everyRoom.toArray()
        .then((everyRoomArray) => {
            console.log(everyRoomArray)
            for (room in everyRoomArray) {
                console.log(room)
                    roomsList.push(textFormat.textLink(everyRoomArray[room].name, `/rooms/${everyRoomArray[room].name}`))
                }
        })
})
// .then(() => {
//     db.close()
// })

module.exports = { roomsList }