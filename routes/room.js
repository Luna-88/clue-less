const express = require('express')
const roomRouter = express.Router()


const db = require('../model/db')
const rooms = require('../model/rooms')
const questionRouter = require('./question').questionRouter


roomRouter.use('/:roomId/questions', questionRouter) //Nesting routes


roomRouter.get('/', async (request, response) => {
    let roomList = await rooms.listRooms()
    response.send(roomList)
})


roomRouter.get('/:roomId', async (request, response) => {
    let roomId = request.params.roomId
    try {
        db.getCollection('rooms').then((room) => {
            return room.findOne({
                name: roomId
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
    roomRouter
}