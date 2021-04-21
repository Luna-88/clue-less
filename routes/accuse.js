const express = require('express')
const accuseRouter = express.Router()

const db = require('../model/db')
const accusations = require('../model/accusations')

accuseRouter.use(express.urlencoded({ extended: true }))
accuseRouter.use(express.json())


accuseRouter.get('/', async (request, response) => {
    const accusedForm = await accusations.generateAccusedForm()
    try {
        response.send(accusedForm)
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem submitting your accusation`)
    }
}
)


accuseRouter.post('/', (request, response) => {
    const accusationForm = request.body
    try {
        db.getCollection('accusations').then((accusation) => {
            return accusation.insertOne(accusationForm)
        })
        .then((result) => {
            accusations.findAccused(response)
        })
    }    
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem submitting your accusation`)
    }
})

module.exports = {
    accuseRouter,
}