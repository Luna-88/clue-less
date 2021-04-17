const express = require('express')
const app = express()


const intro = require('./routes/intro').introRouter
const routes = require('./routes/room').roomRouter
const accuse = require('./routes/accuse').accuseRouter


app.use('/', intro)
app.use('/rooms', routes)
app.use('/accuse', accuse)


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
})