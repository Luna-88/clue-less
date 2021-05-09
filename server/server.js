const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

const intro = require('./routes/intro').introRouter
const routes = require('./routes/room').roomRouter
const accuse = require('./routes/accuse').accuseRouter
const score = require('./routes/score').scoreRouter
const user = require('./routes/user').userRouter
const logout = require('./routes/logout').logoutRouter

app.use(cookieParser())
app.use('/', user)
app.use('/intro', intro)
app.use('/rooms', routes)
app.use('/accuse', accuse)
app.use('/score', score)
app.use('/', logout)

const PORT = process.env.PORT || 9000;

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`)
})