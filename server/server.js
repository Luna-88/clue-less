const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

const intro = require('./routes/intro').introRouter
const room = require('./routes/room').roomRouter
const accuse = require('./routes/accuse').accuseRouter
const score = require('./routes/score').scoreRouter
const user = require('./routes/user').userRouter
const logout = require('./routes/logout').logoutRouter

app.use(cookieParser())
app.use('/api', user)
app.use('/api/intro', intro)
app.use('/api/rooms', room)
app.use('/api/accuse', accuse)
app.use('/api/score', score)
app.use('/api', logout)

const PORT = process.env.PORT || 9000;

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`)
})