const scores = require('../../model/scores')
const textFormats = require('../../view/textFormats')

function displayUserScores(username, accuseCount) {
    return `
    <tr>
        <td>${username}</td>
        <td>${accuseCount}</td>
    </tr>`
}

async function generateScoreboard(request, response, accuseAttemptCount,) {
    let userScoreList = []
    const usersCollection = await scores.updateUserScore(request, response, accuseAttemptCount, reset = false)
    await usersCollection.find({ "accuseCount": { $gte: 1, $lte: 10 } })
        .project({ "_id": 0 })
        .sort({ "accuseCount": 1 })
        .forEach(document => userScoreList
            .push(displayUserScores(document.username, document.accuseCount)))
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
        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
        }
    </style>
    </head>
    <body>
        <table id="users">
        <tr>
            <th>Player</th>
            <th>Accuse Attempts</th>
        </tr>
        ${userScoreList.join('')}
        </table>
        <footer>
        <p class="quit" style="font-family:futura; font-size:30px; padding:10px; float:right">
            ${textFormats.setTextLink("Quit", "http://localhost:3000/quit-logout")}
        </p>
    </footer>
    </body>
    `
}

module.exports = {
    generateScoreboard,
}