const textFormats = require('../view/textFormats')

function inspectRooms(room) {
    const clue = textFormats.displayGameTitle()
    const anotherRoom = textFormats.displayParagraphFormat(textFormats.setTextLink(`Go to another room...`, 'http://localhost:3000/rooms'))
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
    return clue + textFormats.displayParagraphFormat(`
    You go into the ${room.room.replace("-", " ")} and look around...
    ${room.description}
    ${ifCharacter}${ifWeapon}`) +
        options +
        anotherRoom
}

module.exports = {
    inspectRooms,
}