const bcrypt = require('bcryptjs')

const db = require('../model/db')

async function checkDuplicateUsername(request, response, next) {
    const usersCollection = await db.getCollection('users')
    await usersCollection.findOne({
        username: request.body.username
    }).then((user) => {
        try {
            if (user) {
                response.status(400).send(`Failed! Username is already in use!`)
            }
        }
        catch (error) {
            console.log(error)
            response.status(500).send(`There was a problem registering your information`)
        }
        next()
    })
}

async function registerUser(request, response, next) {
    db.getCollection("users").then((user) => {
        return user.insertOne({
            username: request.body.username,
            password: bcrypt.hashSync(request.body.password, 8),
            accuseCount: 0
        })
    })
    next()
}

async function signInUser(request, response, next) {
    const usersCollection = await db.getCollection('users')
    await usersCollection.findOne({ username: request.body.username })
        .then((user) => {
            try {
                console.log(user)
                if (!user) {
                    response.status(404).send(`User Not found`)
                }
                const passwordIsValid = bcrypt.compareSync(
                    request.body.password,
                    user.password
                )
                if (!passwordIsValid) {
                    response.status(401).send(`Invalid Password!`)
                }
            }
            catch (error) {
                response.status(500).send(`There was a problem signing in from middle`)
            }
        })
    next()
}


module.exports = {
    checkDuplicateUsername,
    registerUser,
    signInUser,
}