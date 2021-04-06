const express = require('express')
const app = express()

const rooms = [
    {
        name: 'kitchen',
        character: 'Professor Plum',
        weapon: '',
        passage: 'study',
    },
    {
        name: 'ballroom',
        character: 'Rev Green',
        weapon: 'revolver',
        passage: '',
    },
    {
        name: 'conservatory',
        character: '',
        weapon: 'dagger',
        passage: 'lounge',
    },
    {
        name: 'billiard room',
        character: '',
        weapon: 'wrench',
        passage: '',
    },
    {
        name: 'library',
        character: 'Mrs Peacock',
        weapon: 'candlestick',
        passage: '',
    },
    {
        name: 'study',
        character: '',
        weapon: 'lead pipe',
        passage: 'kitchen',
    },
    {
        name: 'hall',
        character: 'Mrs White',
        weapon: 'rope',
        passage: '',
    },
    {
        name: 'lounge',
        character: 'Colonel Mustard',
        weapon: '',
        passage: 'conservatory',
    },
    {
        name: 'dining room',
        character: 'Miss Scarlett',
        weapon: '',
        passage: '',
    },
]

app.get('/', (request, response) => {
    response.send(
        `<p>Dr Black has been murdered in his mansion while hosting a party to celebrate his 70th birthday. He is famously known for being a cunning lawyer with lots of money and an almost equally amount of enemies.</p>
        <p>As a detective, it is your job to head to Dr Black’s mansion and find out: Who killed him? What weapon did they use? And where did it happen?</p>
        <p>You can move freely through adjacent rooms (or use the secret passages when applicable)</p>
        <p>If you find someone in a room, you can ask them one question at a time.</p>
        <p>At any point in the game, when you are ready to make your accusation, call 911
        <p>You can only accuse once.</p>
        <p><a href='./rooms'>Pick the room</a> where you want to start your investigation.</p>`
    )
}
)

rooms.forEach(room => app.get(`/rooms/${room.name}`, (request, response) => {
    response.send(room)
}))

app.get('/rooms', (request, response) => {
    response.send(JSON.stringify(rooms.map(room => room.name).map(item => `<a href='./rooms/${item}'>${item}</a>`)))
}
)



const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
  })