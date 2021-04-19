const express = require('express')
const questionRouter = express.Router({ mergeParams: true })
questionRouter.use(express.urlencoded({ extended: true }))
questionRouter.use(express.json())


const db = require('../model/db')
const questions = require('../model/questions')
const textFormat = require('../view/textFormats')


questionRouter.get('/', async (request, response) => {
    const roomId = request.params.roomId
    const questionForm = await questions.questionForm(roomId)
    response.send(questionForm)
})


questionRouter.post('/', async (request, response) => {
    const roomId = request.params.roomId
    const questionNumber = request.body
    try {
        response.redirect(`http://localhost:3000/rooms/${roomId}/questions/${questionNumber.number}`)
        
    } 
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem submitting your accusation`)
    }
})


questionRouter.get('/:questionId', async (request, response) => {
    let roomId = request.params.roomId
    let questionId = request.params.questionId
    try {
        db.getCollection('rooms').then((room) => {
            return room.findOne({
                room: roomId
            })
            .then((document) => {
                response.send(textFormat.paragraphFormat(document.answers[questionId]))
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