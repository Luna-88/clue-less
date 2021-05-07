const express = require('express')
const roomRouter = express.Router()

const rooms = require('../model/rooms')
const textFormats = require('../view/textFormats')
const questionRouter = require('./question').questionRouter

roomRouter.use('/:roomId/questions', questionRouter) //Nesting routes

roomRouter.get('/', async (request, response) => {
    try {
        response.send(textFormats.displayGameTitle() + await rooms.getRoomList())
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Private room, please go back`)
    }
})

roomRouter.get('/:roomId', async (request, response) => {
    try {
        response.send(await rooms.inspectRooms(request))
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Private room, please go back`)
    }
})

module.exports = {
    roomRouter,
}