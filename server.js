const express = require('express')
const app = express()


const intro = require('./routes/intro').introRouter
const routes = require('./routes/room').roomRouter
const accuse = require('./routes/accuse').accuseRouter
const score = require('./routes/score').scoreRouter


app.use('/', intro)
app.use('/rooms', routes)
app.use('/accuse', accuse)
app.use('/score', score)


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
})