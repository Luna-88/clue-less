const express = require('express')
const scoreRouter = express.Router()


const db = require('../model/db')
const scores = require('../model/scores')


scoreRouter.use(express.urlencoded({ extended: true }))
scoreRouter.use(express.json())

scoreRouter.post('/', (request, response) => {
    const userInformation = request.body
    try {
        db.getCollection('scores').then((user) => {
            return user.insertOne(userInformation)
        })
        .then((result) => {
            response.send(components.userForm())
        })
        
    } 
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem submitting your accusation`)
    }
})


module.exports = {
    introRouter,
}