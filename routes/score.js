const express = require('express')
const scoreRouter = express.Router()
const scoreboardRouter = express.Router({ mergeParams: true })
scoreRouter.use('/score/scoreboard', scoreboardRouter)
scoreRouter.use(express.urlencoded({ extended: true }))
scoreRouter.use(express.json())

const scores = require('../model/scores')
const accusations = require('../model/accusations')

scoreRouter.get('/', async (request, response) => {
    try {
        await accusations.findAccused(response)
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem submitting your accusation`)
    }
})

scoreRouter.get('/scoreboard', async (request, response) => {
    try {
        const scoreboard = await scores.generateScoreboard(accusations.getAccuseCount())
        response.send(scoreboard)
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem displaying the scoreboard`)
    }
})

module.exports = {
    scoreRouter,
}