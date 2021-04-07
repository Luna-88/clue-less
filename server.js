const data = require('./modules/data')
const rooms = data.rooms
const questions = data.questions
const functions = require('./modules/functions')
const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send(
        `<p>Dr Black has been murdered in his mansion while hosting a party to celebrate his 70th birthday. He is famously known for being a cunning lawyer with lots of money and an almost equally amount of enemies.</p>
        <p>As a detective, it is your job to head to Dr Black’s mansion and find out: Who killed him? What weapon did they use? And where did it happen?</p>
        <p><a href='./rooms'>Pick the room</a> where you would like to start your investigation...</p>`
    )
}
)

app.get('/rooms', (request, response) => {
    response.send(JSON.stringify(rooms.map(room => room.name).map(item => `<a href='./rooms/${item}'>${item}</a>`)))
}
)

rooms.forEach(room => app.get(`/rooms/${room.name}`, (request, response) => {
    response.send(functions.inspectRoom(room))
}))

// app.get('/questions', (request, response) => {
//     response.send(JSON.stringify(questions.map(question => question.question).map(item => `<a href='./questions/'>${item}</a>`)))
// })




const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
})