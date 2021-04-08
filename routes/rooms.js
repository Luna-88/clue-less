let router = express.Router()
const data = require('./model/rooms')
const rooms = data.rooms


router.get('/:roomId', (request, response) => {
    let roomId = request.params.roomId
    try {
        let room = rooms.findSceneById(sceneId)
        res.send(formatSceneAsText(scene, wrapWidth, "http://localhost:3000"))    
    }
    catch (error) {
        console.log(error)
        res.status(404).send("Scene " + sceneId + " not found.\n")
    }
})

module.exports = router