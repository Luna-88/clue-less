const getAccessToken = require('./tokens').getAccessToken
const db = require('./db')

async function updateUserScore(request, response, accuseAttemptCount, reset = true) {
    const userAccessToken = getAccessToken(request, response)
    const updatedAccuseCountUser = userAccessToken.accuseCount + accuseAttemptCount
    const username = userAccessToken.username
    const usersCollection = await db.getCollection("users")
    if (reset === false) {
        await usersCollection.updateOne({ username: username },
            { $set: { accuseCount: updatedAccuseCountUser } })
    } else {
        await usersCollection.updateOne({ username: username }, { $set: { accuseCount: 0 } })
    }
    return usersCollection
}

module.exports = {
    updateUserScore,
}