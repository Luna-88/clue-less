const investigation = require('./investigation')

for (room in rooms) {
    investigation.createRoom(rooms[room].id, rooms[room].character, rooms[room].weapon, rooms[room].passage)}

const rooms = [
    {
        id: 'cellar',
        character: '',
        weapon: '',
        passage: '',
    },
    {
        id: 'kitchen',
        character: 'Professor Plum',
        weapon: '',
        passage: 'study',
    },
    {
        id: 'ballroom',
        character: 'Rev Green',
        weapon: 'revolver',
        passage: '',
    },
    {
        id: 'conservatory',
        character: '',
        weapon: 'dagger',
        passage: 'lounge',
    },
    {
        id: 'billiard-room',
        character: '',
        weapon: 'wrench',
        passage: '',
    },
    {
        id: 'library',
        character: 'Mrs Peacock',
        weapon: 'candlestick',
        passage: '',
    },
    {
        id: 'study',
        character: '',
        weapon: 'lead pipe',
        passage: 'kitchen',
    },
    {
        id: 'hall',
        character: 'Mrs White',
        weapon: 'rope',
        passage: '',
    },
    {
        id: 'lounge',
        character: 'Colonel Mustard',
        weapon: '',
        passage: 'conservatory',
    },
    {
        id: 'dining-room',
        character: 'Miss Scarlett',
        weapon: '',
        passage: '',
    },
]

const questions = [
    {
        question: `Was someone acting suspicious the night Dr Black was killed?`
    },
    {
        question: `Where were you the night Dr Black was killed?`
    },
    {
        question: `Did you find something out of place in Dr Black's mansion?`
    },
]

module.exports = {rooms, questions}