const getAccessToken = require('./tokens').getAccessToken
const display = require('../components/displays/scoreboardDisplay')
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

async function generateScoreboard(request, response, accuseAttemptCount) {
    let userScoreList = []
    const usersCollection = await updateUserScore(request, response, accuseAttemptCount, reset = false)
    await usersCollection.find({ "accuseCount": { $gte: 1, $lte: 10 } })
        .project({ "_id": 0 })
        .sort({ "accuseCount": 1 })
        .forEach(document => userScoreList
            .push(display.displayUserScores(document.username, document.accuseCount)))
    return display.displayScoreboard(userScoreList)
}

module.exports = {
    updateUserScore,
    generateScoreboard,
}