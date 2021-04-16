const express = require('express')
const questionRouter = express.Router({ mergeParams: true })

const db = require('../model/db')
const questions = require('../model/questions')
const textFormat = require('../view/textFormat')


questionRouter.get('/', async (request, response) => {
    let roomId = request.params.roomId
    let questionList = await questions.selectQuestion(roomId)
    response.send(questionList)
})


questionRouter.get('/:questionId', async (request, response) => {
    let questionId = request.params.questionId
    let roomId = request.params.roomId
    try {
        db.getCollection('rooms').then((room) => {
            return room.findOne({
                name: roomId
            })
            .then((answers) => {
                response.send(textFormat.paragraphFormat(answers.answers[questionId]))
            })
        })
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Private room, please go back`)
    }
})


module.exports = {
    questionRouter
}