const components = require('../view/components')
const db = require('./db')
let questionList = []


async function selectQuestion(roomId) {
    questionList = []
    const questionsCollection = await db.getCollection("questions")
    await questionsCollection.find({})
        .project({ "_id": 0 })
        .forEach(document => questionList
            .push(components.askButton(document.question, roomId, document.number)))
    return questionList.join('')
}


module.exports = {
    selectQuestion,
}