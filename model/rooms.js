const textFormat = require('../view/textFormats')
const db = require('./db')

let roomList = []


function inspectRoom(room) {
    const clue = textFormat.gameTitle()
    const enter = `You have entered the ${room.room}...`
    const options = [textFormat.textLink(`
        Ask a Question`, `http://localhost:3000/rooms/${room.room}/questions`),
        `or`,
        textFormat.textLink(`
        Accuse`, `../accuse`)].join(' ')
    const anotherRoom = textFormat.paragraphFormat(textFormat.textLink(`Go to another room...`, 'http://localhost:3000/rooms'))
    if (room.character.length === 0 && room.weapon.length > 0) {
        return clue + textFormat.paragraphFormat(`
        ${enter}
        No one is here...
        You look around...
        There is a ${room.weapon} in the room`)
        + anotherRoom
    } if (room.character.length > 0 && room.weapon.length === 0) {
        return clue + textFormat.paragraphFormat(`
        ${enter}
        You find ${room.character} pacing inside...`)
        + options
        + anotherRoom
    } if (room.character.length > 0 && room.weapon.length > 0) {
        return clue + textFormat.paragraphFormat(`
        ${enter}
        You find ${room.character} pacing in the room...
        There is a ${room.weapon} as well`)
        + options
        + anotherRoom
    } if (room.character.length === 0 && room.weapon.length === 0) {
        return clue + textFormat.paragraphFormat(`
        ${enter}
        The place is empty...`)
        + anotherRoom
    }
}


async function listRooms() {
    roomList = []
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({})
        .project({ "_id": 0 })
        .forEach(document => roomList
            .push(`
            <div class="grid-item">
                ${textFormat.paragraphFormat(textFormat.textLink(textFormat.textOption(document.room), `/rooms/${document.room}`))}
            </div>
            `))
    return roomList.join('')
}


function roomGrid(list) {
    return `
    <head>
    <style>
        .grid-container {
            display: grid;
            grid-template-columns: auto auto auto;
            background-color: #b0d9f95c;
            padding: 10px;
        }
        .grid-item {
            background-color: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(0, 0, 0, 0.5);
            padding: 20px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
        }
        .grid-item:hover {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.8);
        }
        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
        }
        .quit {
            float: right;
        }
    </style>
    </head>
    <body>
    <div class="grid-container">
        ${list}
    </div>
    </body>
    <div class="footer">
    <footer>
        <p class="quit" style="font-family:futura; font-size:30px">
            Save and Quit
        </p>
    </footer>
    </div>
    `
}

// async function listRooms() {
//     roomList = []
//     const roomsCollection = await db.getCollection('rooms')
//     await roomsCollection.find({})
//         .project({ "room": 1, "_id": 0 })
//         .forEach(document => roomList
//             .push(textFormat.paragraphFormat(textFormat.textLink(
//             document.room, `/rooms/${document.room}`))))
//     return roomList.join('')
// }


module.exports = {
    inspectRoom,
    listRooms,
    roomGrid,
}