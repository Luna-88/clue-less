const express = require('express')
const questionRouter = express.Router({ mergeParams: true })
questionRouter.use(express.urlencoded({ extended: true }))
questionRouter.use(express.json())

const db = require('../model/db')
const questions = require('../model/questions')
const textFormats = require('../view/textFormats')


questionRouter.get('/', async (request, response) => {
    const roomId = request.params.roomId
    const questionForm = await questions.generateQuestionForm(roomId)
    try {
        response.send(questionForm)
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Private room, please go back`)
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
        response.status(404).send(`Private room, please go back`)
    }
})


questionRouter.get('/:questionId', async (request, response) => {
    const roomId = request.params.roomId
    const questionId = request.params.questionId
    const ok = textFormats.paragraphFormat(textFormats.textLink(`OK`, './'))
    try {
        db.getCollection('rooms').then((room) => {
            return room.findOne({
                room: roomId
            })
            .then((document) => {
                response.send(textFormats.textAnswers(document.answers[questionId])+ ok)
            })
        })
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Private room, please go back`)
    }
})


module.exports = {
    questionRouter,
}