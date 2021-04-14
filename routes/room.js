const express = require('express')
const db = require('../model/db')
const router = express.Router()
const room = require('../model/rooms')


router.get('/:roomId', async (request, response) => {
    let roomId = request.params.roomId
    try {
        db.getCollection('rooms').then((rooms) => {
            return rooms.findOne({
                name: roomId
            })
            .then((result) => {
                response.send(room.inspectRoom(result))
            })
        })
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Private room, please go back`)
    }
})

module.exports = router