const express = require('express')
const db = require('../model/db')
const router = express.Router()
const investigation = require('../model/investigation')


router.get('/:roomId', async (request, response) => {
    let roomId = request.params.roomId
    try {
        db.getCollection('rooms').then((rooms) => {
            return rooms.findOne({
                name: roomId
            })
            .then((result) => {
                response.send(investigation.inspectRoom(result))
            })
        })
        // .then(() => {
        //     db.close()
        // })
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Private room, please go back`)
    }
})

module.exports = router