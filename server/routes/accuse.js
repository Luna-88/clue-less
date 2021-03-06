const express = require('express')
const accuseRouter = express.Router()
accuseRouter.use(express.urlencoded({ extended: true }))
accuseRouter.use(express.json())

const accusations = require('../models/accusations')

accuseRouter.get('/', async (request, response) => {
    try { 
        response.json(await accusations.getAllAccusationOptions())
    }
    catch (error) {
        console.log(error)
        response.status(404).send('There was a problem with the accusation form')
    }
}
)

// accuseRouter.post('/', async (request, response) => {
//     const selectedAccuseOptions = request.body
//     try {
//         await accusations.addAccusations(selectedAccuseOptions)
//         response.redirect("http://localhost:3000/score")
//     }
//     catch (error) {
//         console.log(error)
//         response.status(404).send(`There was a problem submitting your accusation`)
//     }
// })

module.exports = {
    accuseRouter,
}