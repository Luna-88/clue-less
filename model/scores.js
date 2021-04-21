const db = require('./db')

const accusations = require('./accusations')
const userInformation = require('../routes/intro').userInformation
const textFormats = require('../view/textFormats')


async function updateUserScore(win = true) {
    const usersCollection = await db.getCollection("users")
    if (win === false) {
        await usersCollection.updateOne({ firstName: userInformation[0].firstName, lastName: userInformation[0].lastName }, { $set: { accuseCount: accusations.getAccuseCount() } })
    } else {
        await usersCollection.updateOne({ firstName: userInformation[0].firstName, lastName: userInformation[0].lastName }, { $set: { accuseCount: 0 } })
    }
}


function displayUserScores(firstName, lastName, accuseCount) {
    return `
    <tr>
        <td>${firstName} ${lastName}</td>
        <td>${accuseCount}</td>
    </tr>`
}


async function getUserScores() {
    let userScoreList = []
    const usersCollection = await db.getCollection("users")
    await usersCollection.find({})
        .project({ "_id": 0 })
        .sort({ "accuseCount": 1 })
        .forEach(document => userScoreList
            .push(displayUserScores(document.firstName, document.lastName, document.accuseCount)))
    return userScoreList.join('')
}


async function generateScoreboard() {
    const userScores = await getUserScores()
    return `
    <head>
        <style>
        #users {
            font-family: futura;
            text-align: center;
            border-collapse: collapse;
            width: 100%;
        }
        #users td, #users th {
            border: 1px solid #ddd;
            padding: 8px;
        }
        #users tr:nth-child(even) {background-color: white;}
        #users tr:hover {background-color: #ddd;}
        #users th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: center;
            background-color: #b0d9f95c;
            color: black;
        }
        </style>
    </head>
    <body>
    ${textFormats.gameTitle()}
        <table id="users">
        <tr>
            <th>Player Name</th>
            <th>Accuse Attempts</th>
        </tr>
        ${userScores}
        </table>
    </body>
    `
}


module.exports = {
    updateUserScore,
    generateScoreboard,
}