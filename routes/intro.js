const express = require('express')
const introRouter = express.Router()

const components = require('../components/messages/introMessage')

introRouter.get('/', async (request, response) => {
    try {
        response.send(components.generateIntroMessage())
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Sorry, there was an error displaying intro message`)
    }
}
)

module.exports = {
    introRouter,
}