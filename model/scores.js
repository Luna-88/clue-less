const db = require('./db')


async function addUserScores(userInitials, score) {
    let scoreCollection = await db.getCollection('scores')
    await scoreCollection.insertOne({ userInitials, score })

}


module.exports = {
    addUserScores,
}