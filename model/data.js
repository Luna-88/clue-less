const rooms = [
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
    {   id: `question1`,
        question: `Was someone acting suspicious the night Dr Black was killed?`,
    },
    {   id: `question2`,
        question: `Where were you the night Dr Black was killed?`,
    },
    {
        id: `question3`,
        question: `Did you find something out of place in Dr Black's mansion?`,
    },
]

module.exports = { rooms, questions }