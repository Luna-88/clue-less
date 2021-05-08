const express = require('express')
const questionRouter = express.Router({ mergeParams: true })
questionRouter.use(express.urlencoded({ extended: true }))
questionRouter.use(express.json())

const answers = require('../model/answers')
const questions = require('../model/questions')

questionRouter.get('/', async (request, response) => {
    const roomId = request.params.roomId
    try {
        response.send(await questions.generateQuestionForm(roomId))
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Sorry, there was a problem displaying the questions`)
    }
})

questionRouter.post('/', async (request, response) => {
    const roomId = request.params.roomId
    const questionNumber = request.body
    try {
        response.redirect(`http://localhost:3000/rooms/${roomId}/questions/${questionNumber.number}`)
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Sorry, there was a problem displaying the answer`)
    }
})

questionRouter.get('/:questionId', async (request, response) => {
    const roomId = request.params.roomId
    const questionId = request.params.questionId
    try {
        response.send(await answers.generateAnswerDisplay(roomId, questionId))
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Sorry, there was a problem displaying the answer`)
    }
})

module.exports = {
    questionRouter,
}