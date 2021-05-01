const textFormats = require('../view/textFormats')
const components = require('../components/displays/answerDisplay')
const db = require('./db')

async function generateAnswerDisplay(roomId, questionId) {
    let answer = []
    const ok = textFormats.displayParagraphFormat(textFormats.setTextLink(`OK`, './'))
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({ room: roomId })
        .project({ "answers": 1, "_id": 0 })
        .forEach(document => { answer.push(components.displayAnswerFormat(document.answers[questionId]) + ok) })
    return answer.join('')
}

module.exports = {
    generateAnswerDisplay,
}