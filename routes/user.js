const express = require('express')
const userRouter = express.Router()

userRouter.use(express.urlencoded({ extended: true }))
userRouter.use(express.json())

const users = require('../model/users')
const scores = require('../model/scores')

let userInformation = []


userRouter.get('/', async (request, response) => {
    try {
        response.send(users.generateUserForm("http://localhost:3000/", "post","Register",signin=true))
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem accessing your information`)
    }
})


userRouter.post('/', (request, response) => {
    const userInformation = request.body
    try {
        users.createUser(userInformation.firstName,userInformation.lastName).then(result=>{
            response.redirect("http://localhost:3000/signin")
        })
    }    
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem accessing your information`)
    }
})


userRouter.get('/signin', async (request, response) => {
    try {
        response.send(users.generateUserForm("http://localhost:3000/intro", "get", "Sign in"))
    }
    catch {
        console.log(error)
        response.status(404).send(`There was a problem accessing your information`)
    } 
})


userRouter.get('/logout', async (request, response) => {
    await scores.updateUserScore(win=false)
    try {
        response.send(`You've been logged out`)
    }    
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem accessing your information`)
    }
})


module.exports = {
    userRouter,
    userInformation,
}