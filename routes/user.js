const express = require('express')
const userRouter = express.Router()

userRouter.use(express.urlencoded({ extended: true }))
userRouter.use(express.json())

const users = require('../model/users')
const scores = require('../model/scores')
const accusations = require('../model/accusations')
const intro = require('./intro')

userRouter.get('/', async (request, response) => {
    try {
        response.send(users.generateUserForm("http://localhost:3000/", "post", "Register", signin = true))
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem accessing your information`)
    }
})

userRouter.post('/', (request, response) => {
    const userRegisterInformation = request.body
    try {
        users.createUser(userRegisterInformation.firstName, userRegisterInformation.lastName).then(result => {
            response.redirect("http://localhost:3000/signin")
        })
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem registering your information`)
    }
})

userRouter.get('/signin', async (request, response) => {
    try {
        accusations.resetAccuseCount()
        users.resetCurrentAccuseCountUser()
        intro.resetUserSignInInformation()
        response.send(users.generateUserForm("http://localhost:3000/intro", "get", "Sign in"))
    }
    catch {
        console.log(error)
        response.status(404).send(`There was a problem signing in`)
    }
})

userRouter.get('/save-logout', async (request, response) => {
    await scores.updateUserScore(accusations.getAccuseCount(), reset = false)
    try {
        response.send(users.generateUserLogoutMessage())
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem logging out`)
    }
})

userRouter.get('/quit-logout', async (request, response) => {
    await scores.updateUserScore(accusations.getAccuseCount(), reset = true)
    try {
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