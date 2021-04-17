const express = require('express')
const { findKiller } = require('../model/accusations')
const accuseRouter = express.Router()

const db = require('../model/db')
const components = require('../view/components')
const accusations = require('../model/accusations')


accuseRouter.use(express.urlencoded({ extended: true }))
accuseRouter.use(express.json())


accuseRouter.get('/', async (request, response) => {
    response.send(components.accuseForm())
}
)


accuseRouter.post('/', (request, response) => {
    const accusationForm = request.body
    try {
        db.getCollection('accusations').then((accusation) => {
            return accusation.insertOne(accusationForm)
        })
        .then((result) => {
            accusations.findKiller()
        })
            .then((result)=>{
            response.redirect("/accuse")
        
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