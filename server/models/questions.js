const forms = require('../components/forms/questionForm')
const db = require('./db')

async function generateQuestionForm(roomId) {
    let questionList = []
    const questionsCollection = await db.getCollection("questions")
    await questionsCollection.find({})
        .project({ "_id": 0 })
        .forEach(document => questionList
            .push(forms.displayQuestionFormat("number", document.number, document.question)))
    return forms.generateQuestionFormFormat(roomId, questionList)
}

module.exports = {
    generateQuestionForm,
}