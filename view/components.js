const textFormats = require('./textFormats')
const db = require('../model/db')


let characterList = []
let weaponList = []
let roomList = []


async function getAnswerOptions(list, option) {
    list = []
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({})
        .project({ "answers": 0, "_id": 0 })
        .forEach(document => list
            .push(textFormats.textOption(document[option])))
    return list.join("")
}


async function getAnswerSelects(optionList, option, label) {
    const options = await getAnswerOptions(optionList, option)
    return `
    <label for="${option}">${label}</label><br>
    <select name="${option}" id="${option}" style="height:40px; width:250px font-family:calibri; font-size:20px">
        ${options}
    </select><br>
    `
}


async function accuseForm() {
    const selectCharacters = await getAnswerSelects(characterList, "character", "Who killed him?")
    const selectWeapons = await getAnswerSelects(weaponList, "weapon", "What weapon did they use?")
    const selectRooms = await getAnswerSelects(roomList, "room", "Where did it happen?")
    return `
    <body style="font-family:calibri; font-size:30px; text-align:justify">    
        <form action="http://localhost:3000/accuse" method="post">
            ${selectCharacters}
            ${selectWeapons}
            ${selectRooms}
            <input type="submit" value="Accuse" style="margin:10px; height:40px;width:100px; font-family:calibri; font-size:25px; text-align:center">
        </form>
    </body>
    `
}


module.exports = {
    accuseForm,
}