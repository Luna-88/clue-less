const textFormats = require('../view/textFormats')
const db = require('./db')


function inputQuestions(questionNumber, questionValue, question) {
    return `
    <input type="radio" name="${questionNumber}" value="${questionValue}">
    <label for="${questionValue}" style="font-family:futura; font-size:30px; text-align:justify">${question}</label><br>
     `
}


async function selectQuestion() {
    let questionList = []
    const questionsCollection = await db.getCollection("questions")
    await questionsCollection.find({})
        .project({ "_id": 0 })
        .forEach(document => questionList
            .push(inputQuestions("number", document.number, document.question)))
    return questionList.join('')
}


async function questionForm(roomId) {
    let questionList = await selectQuestion()
    const done = textFormats.paragraphFormat(textFormats.textLink(`Done`, `http://localhost:3000/rooms/${roomId}`))
    return `
    ${textFormats.gameTitle()}
    <form action="http://localhost:3000/rooms/${roomId}/questions/" method="post" style="margin:0px">
        ${questionList}
        <input type="submit" value="Ask" style="height:40px; width:65px; font-family:futura; font-size:25px; text-align:center; margin:10px">
    </form>
    ${done}
    `
}


module.exports = {
    selectQuestion,
    questionForm,
}