const express = require('express')
const roomRouter = express.Router()

const db = require('../model/db')
const rooms = require('../model/rooms')
const textFormats = require('../view/textFormats')
const questionRouter = require('./question').questionRouter


roomRouter.use('/:roomId/questions', questionRouter) //Nesting routes


roomRouter.get('/', async (request, response) => {
    const roomList = await rooms.listRooms()
    try {
        response.send(textFormats.gameTitle()+ rooms.roomGrid(roomList))
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Private room, please go back`)
    }
})


roomRouter.get('/:roomId', async (request, response) => {
    const roomId = request.params.roomId
    try {
        db.getCollection('rooms').then((room) => {
            return room.findOne({
                room: roomId
            })
            .then((result) => {
                response.send(rooms.inspectRoom(result))
            })
        })
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Private room, please go back`)
    }
})


module.exports = {
    roomRouter,
}