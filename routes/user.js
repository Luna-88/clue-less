const express = require('express')
const userRouter = express.Router()

userRouter.use(express.urlencoded({ extended: true }))
userRouter.use(express.json())

const userMiddleware = require('../middleware/users')
const users = require('../model/users')
const scores = require('../model/scores')
const accusations = require('../model/accusations')

userRouter.get('/', async (request, response) => {
    // accusations.resetAccuseCount()
    // users.resetCurrentAccuseCountUser()
    // users.resetUserSignInInformation(userSignInInformation)
    try {
        response.send(users.generateUserForm("http://localhost:3000/", "post", "Register", signin = true))
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem accessing your information`)
    }
})

userRouter.post('/', userMiddleware.checkDuplicateUsername, userMiddleware.registerUser, async (request, response) => {
    try {
        response.redirect("http://localhost:3000/signin")
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem registering your information`)
    }
})

userRouter.get('/signin', async (request, response) => {
    try {
        response.send(users.generateUserForm("http://localhost:3000/signin", "post", "Sign in"))
    }
    catch {
        console.log(error)
        response.status(404).send(`There was a problem signing in`)
    }
})

userRouter.post('/signin', userMiddleware.signInUser, async (request, response) => {
    try {
        response.redirect("http://localhost:3000/intro")
    }
    catch {
        console.log(error)
        response.status(404).send(`There was a problem signing in`)
    }
})

userRouter.get('/save-logout', async (request, response) => {
    try {
        await scores.updateUserScore(accusations.getAccuseCount(), reset = false)
        response.send(users.generateUserLogoutMessage())
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem logging out`)
    }
})

userRouter.get('/quit-logout', async (request, response) => {
    try {
        await scores.updateUserScore(accusations.getAccuseCount(), reset = true)
        response.send(users.generateUserLogoutMessage())
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem logging out`)
    }
})

module.exports = {
    userRouter,
}