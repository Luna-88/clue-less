const express = require('express')
const scoreRouter = express.Router()
const scoreboardRouter = express.Router({ mergeParams: true })

const db = require('../model/db')
const scores = require('../model/scores')
const textFormats = require('../view/textFormats')


scoreRouter.use('/score/scoreboard', scoreboardRouter)
scoreRouter.use(express.urlencoded({ extended: true }))
scoreRouter.use(express.json())

//how to change to put without form
scoreRouter.get('/', async (request, response) => {
    await scores.updateUserScore(response)
    try {
        response.send(textFormats.paragraphFormat(`
        CONGRATULATIONS! You've found the killer!
        Apart from a few, everyone has killed at least one person: Professor Plum missed Dr. Black with the revolver but later killed him with the candlestick; Mrs. Peacock stabbed the cook, her former employee; Mrs. White strangled the maid out of jealousy and hatred for the latter's affair with her husband whom she had also killed; and Miss Scarlet clubbed the cop, whom she was bribing. The butler reveals that he is the real Dr. Black; the person that Plum killed was Dr. Black's butler. With his spies and informants disposed of (the maid, the cop, and the cook), he plans to continue blackmailing the guests. Rev. Green then draws his own revolver, kills Dr. Black, and reveals himself to be an undercover FBI agent, revealing his earlier admittance as a homosexual a ruse to get close to dr. Black. After telling the police chief he has killed Dr. Black in the hall with his revolver, Rev. Green says: "Okay, Chief, take 'em away! I'm gonna go home and sleep with my wife!"
        `))
    }
    catch (error) {
        console.log(error)
        response.status(404).send(`Sorry, there was a problem saving your information`)
    }
})


// RETRIEVE SCORE DB AND DISPLAY IN DESCENDING ORDER
// scoreRouter.get('/scoreboard', (request, response) => {
//     const userInformation = request.body
//     try {
//         db.getCollection('scores').then((user) => {
//             return user.insertOne(userInformation)
//         })
//         .then((result) => {
//             response.send(components.userForm())
//         })
        
//     } 
//     catch (error) {
//         console.log(error)
//         response.status(404).send(`There was a problem submitting your accusation`)
//     }
// })


module.exports = {
    scoreRouter,
}