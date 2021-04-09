function inspectRoom(room) {
    const enter = `<p>You have entered the ${room.name}...</p>`
    const options = `<p><a href='./questions'>Ask a question</a> or <a href='./Accuse'>Accuse</a></p>`
    const back = `<a href='./'>Go back</a>`
    if (room.character.length === 0 && room.weapon.length > 0) {
        return `${enter}<p>No one is here...</p>
                <p>You look around...</p>
                <p>There is a ${room.weapon} in the room</p>
                ${back}`
    } else if (room.character.length > 0 && room.weapon.length === 0) {
        return `${enter}<p>You find ${room.character} pacing in the room...</p>
                ${options}`
    } else if (room.character.length > 0 && room.weapon.length > 0) {
        return `${enter}<p>You find ${room.character} pacing in the room...</p>
                <p>There is a ${room.weapon} as well</p>
                ${options}`
    }
}

module.exports = { inspectRoom  }