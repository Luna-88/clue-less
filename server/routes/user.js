const express = require('express')
const userRouter = express.Router()

userRouter.use(express.urlencoded({ extended: true }))
userRouter.use(express.json())

const userMiddleware = require('../middleware/registerUser')

userRouter.post('/signIn', userMiddleware.checkDuplicateUsername, userMiddleware.registerUser, async (request, response) => {
    try {
        response.json({ message: "Registered successfully!" })
    }
    catch (error) {
        console.log(error)
        response.status(404).send("There was a problem registering your information")
    }
})

module.exports = {
    userRouter,
}