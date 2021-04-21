const db = require('./db')

const finalCount = require('./accusations').finalCount
const userInformation = require('../routes/intro').userInformation


//use this function in userRoutes and scoreRoutes
async function updateUserScore(response, win = true) {
    const usersCollection = await db.getCollection("users")
    if (win === false) {
        await usersCollection.updateOne({ firstName: userInformation.firstName, lastName: userInformation.lastName }, {$set:{accuseCount:finalCount}})
        return response.redirect("http://localhost:3000/")
    } else {
        await usersCollection.updateOne({ "firstName": userInformation.firstName, "lastName": userInformation.lastName }, {$set:{"accuseCount":["0"]}})
    }
}



module.exports = {
    updateUserScore,
}