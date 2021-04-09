const express = require('express')
const router = express.Router()
const investigation = require('../model/investigation')


router.get('/:roomId', (request, response) => {
    let roomId = request.params.roomId
    try {
        let room = investigation.findRoomById(roomId)
        response.send(investigation.inspectRoom(room))    
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Private room, please go back`)
    }
})

module.exports = router