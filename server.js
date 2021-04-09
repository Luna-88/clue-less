const rooms = require('./model/rooms')
const textFormat = require('./view/textFormat')
const investigation = require('./model/investigation')
const roomRoutes = require('./routes/rooms')
const express = require('express')
const app = express()


app.get('/', (request, response) => {
    response.send(textFormat.paragraphFormat(`Dr Black has been murdered in his mansion while hosting a party to celebrate his 70th birthday. He is famously known for being a cunning lawyer with lots of money and an almost equally amount of enemies.
    As a detective, it is your job to head to Dr Black’s mansion and find out: Who killed him? What weapon did they use? And where did it happen? 
    Where would you like to start?`) + textFormat.textLink(`Pick a room`,'./rooms'))
}
)

app.get('/rooms', (request, response) => {
    response.send(rooms.roomsList.join('\n'))
}
)

app.use('/rooms', roomRoutes)



// app.get('/questions', (request, response) => {
//     response.send(JSON.stringify(questions.map(question => question.question).map(item => `<a href='./questions/'>${item}</a>`)))
// })




const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
})