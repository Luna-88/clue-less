const express = require('express')
const userRouter = express.Router()

userRouter.use(express.urlencoded({ extended: true }))
userRouter.use(express.json())

const users = require('../model/users')

let userInformation = []


userRouter.get('/', async (request, response) => {
    try {
        response.send(users.userForm("http://localhost:3000/", "post","Register",signin=true))
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


//When save and quit redirected here, update database and set accuseCount to finalCount
//userRouter.put


userRouter.get('/signin', async (request, response) => {
    try {
        response.send(users.userForm("http://localhost:3000/intro", "get", "Sign in"))
    }
    catch {
        console.log(error)
        response.status(404).send(`There was a problem accessing your information`)
    } 
})


module.exports = {
    userRouter,
    userInformation,
}