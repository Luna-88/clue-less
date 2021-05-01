const express = require('express')
const questionRouter = express.Router({ mergeParams: true })
questionRouter.use(express.urlencoded({ extended: true }))
questionRouter.use(express.json())

const answers = require('../model/answers')
const components = require('../components/forms/questionForm')

questionRouter.get('/', async (request, response) => {
    const roomId = request.params.roomId
    try {
        const questionForm = await components.generateQuestionForm(roomId)
        response.send(questionForm)
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
        const generateAnswerDisplay = await answers.generateAnswerDisplay(roomId, questionId)
        response.send(generateAnswerDisplay)
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Sorry, there was a problem displaying the answer`)
    }
})

module.exports = {
    questionRouter,
}