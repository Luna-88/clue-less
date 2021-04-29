const express = require('express')
const introRouter = express.Router()

const intros = require('../model/intros')

introRouter.get('/', async (request, response) => {
    try {
        response.send(intros.generateIntroMessage())
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