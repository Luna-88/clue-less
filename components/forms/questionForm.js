const textFormats = require('../../view/textFormats')
const db = require('../../model/db')

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

module.exports = {
    generateQuestionForm,
}