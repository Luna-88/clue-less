const textFormats = require('../view/textFormats')
const db = require('./db')

function displayQuestionFormat(questionNumber, questionValue, question) {
    return `
    <input type="radio" name="${questionNumber}" value="${questionValue}">
    <label for="${questionValue}" style="font-family:futura; font-size:30px; text-align:justify">${question}</label><br>
     `
}

async function generateQuestionForm(roomId) {
    const done = textFormats.displayParagraphFormat(textFormats.setTextLink(`Done`, `http://localhost:3000/rooms/${roomId}`))
    let questionList = []
    const questionsCollection = await db.getCollection("questions")
    await questionsCollection.find({})
        .project({ "_id": 0 })
        .forEach(document => questionList
            .push(displayQuestionFormat("number", document.number, document.question)))
    return `
    ${textFormats.displayGameTitle()}
    <form action="http://localhost:3000/rooms/${roomId}/questions/" method="post" style="margin:0px">
        ${questionList.join('')}
        <input type="submit" value="Ask" style="height:40px; width:65px; font-family:futura; font-size:25px; text-align:center; margin:10px">
    </form>
    ${done}
    `
}

function displayAnswerFormat(text) {
    return `
    <div style="margin:auto;width:35%;border-radius:90px;border:3px solid blue;padding:30px">
        ${textFormats.displayParagraphFormat(`"${text}"`)}
    </div>
    <div style="margin:auto; background: white; width:0; height:0; border-top: 50px solid blue; border-left: 30px solid transparent;">
    </div>
    `
}

async function generateAnswerDisplay(roomId, questionId) {
    let answer = []
    const ok = textFormats.displayParagraphFormat(textFormats.setTextLink(`OK`, './'))
    const roomsCollection = await db.getCollection('rooms')
    await roomsCollection.find({ room: roomId })
        .project({ "answers": 1, "_id": 0 })
        .forEach(document => { answer.push(displayAnswerFormat(document.answers[questionId]) + ok) })
    return answer.join('')
}

module.exports = {
    generateQuestionForm,
    generateAnswerDisplay,
}