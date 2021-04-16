const express = require('express')
const introRouter = express.Router()


const textFormat = require('../view/textFormat')


introRouter.get('/', (request, response) => {
    response.send(textFormat.paragraphFormat(`Dr Black has been murdered in his mansion while hosting a party to celebrate his 70th birthday. He is famously known for being a cunning lawyer with lots of money and an almost equally amount of enemies.
    As a detective, it is your job to head to Dr Black’s mansion and find out: Who killed him? What weapon did they use? And where did it happen? 
    Where would you like to start?`) + textFormat.textLink(`Pick a room`, './rooms'))
}
)


module.exports = {
    introRouter
}