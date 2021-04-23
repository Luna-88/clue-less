const express = require('express')
const introRouter = express.Router()

const users = require('../model/users')
const intros = require('../model/intros')

let userSignInInformation = []

introRouter.get('/', async (request, response) => {
    userSignInInformation.push(request.query)
    await users.findUser(userSignInInformation[0].username, userSignInInformation[0].password)
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
    userSignInInformation,
}