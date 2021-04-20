const express = require('express')
const userRouter = express.Router()

userRouter.use(express.urlencoded({ extended: true }))
userRouter.use(express.json())

const users = require('../model/users')


userRouter.get('/', async (request, response) => {
    try {
        response.send(users.userForm())
    }
    catch {
        console.log(error)
        response.status(404).send(`Sorry, there was a accessing this page`)
    }
})


userRouter.post('/', (request, response) => {
    const userInformation = request.body
    try {
        users.createUser(userInformation.firstName,userInformation.lastName).then(result=>{
            response.redirect("http://localhost:3000/intro")
        })
    }    
    catch (error) {
        console.log(error)
        response.status(404).send(`There was a problem registering your information`)
    }
})


module.exports = {
    userRouter,
}