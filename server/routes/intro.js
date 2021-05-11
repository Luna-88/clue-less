const express = require('express')
const introRouter = express.Router()

introRouter.post('/', async (request, response) => {
    try {
        response.json({ message: "Signed in successfully" })
    }
    catch (error) {
        console.log(error)
        response.status(404).send("Sorry, there was an error displaying intro message")
    }
})

module.exports = {
    introRouter,
}