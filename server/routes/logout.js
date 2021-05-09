const express = require('express')
const logoutRouter = express.Router()

logoutRouter.use(express.urlencoded({ extended: true }))
logoutRouter.use(express.json())

const scores = require('../models/scores')
const accusations = require('../models/accusations')

logoutRouter.get('/save-logout', async (request, response) => {
    try {
        await scores.updateUserScore(request, response, accusations.getAccuseAttemptCount(), reset = false)
        response.send(message.generateUserLogoutMessage())
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem logging out`)
    }
})

logoutRouter.get('/quit-logout', async (request, response) => {
    try {
        await scores.updateUserScore(request, response, accusations.getAccuseAttemptCount(), reset = true)
        response.send(message.generateUserLogoutMessage())
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem logging out`)
    }
})

module.exports = {
    logoutRouter,
}