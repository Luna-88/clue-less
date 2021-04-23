const db = require('./db')
const currentUserSignInInformation = require('../routes/intro').userSignInInformation
const textFormats = require('../view/textFormats')

async function updateUserScore(accuseAttemptCount, reset = true) {
    if (accuseAttemptCount !== 0) {
        const usersCollection = await db.getCollection("users")
        if (reset === false) {
            await usersCollection.updateOne({ firstName: currentUserSignInInformation[0].firstName, lastName: currentUserSignInInformation[0].lastName }, { $set: { accuseCount: accuseAttemptCount } })
        } else {
            await usersCollection.updateOne({ firstName: currentUserSignInInformation[0].firstName, lastName: currentUserSignInInformation[0].lastName }, { $set: { accuseCount: 0 } })
        }
        return usersCollection
    }
}

function displayUserScores(firstName, lastName, accuseCount) {
    return `
    <tr>
        <td>${firstName} ${lastName}</td>
        <td>${accuseCount}</td>
    </tr>`
}

async function generateScoreboard(accuseAttemptCount) {
    let userScoreList = []
    const usersCollection = await updateUserScore(accuseAttemptCount, reset = false)
    await usersCollection.find({ "accuseCount": { $gte: 1, $lte: 10 } })
        .project({ "_id": 0 })
        .sort({ "accuseCount": 1 })
        .forEach(document => userScoreList
            .push(displayUserScores(document.firstName, document.lastName, document.accuseCount)))
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
            <th>Player Name</th>
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

function generateWinnerMessage(accuseAttemptCount) {
    return textFormats.displayParagraphFormat(textFormats.displayGameTitle() +
        `CONGRATULATIONS! You've found the killer in only ${accuseAttemptCount} attempts!
    Apart from a few, everyone has killed at least one person: Professor Plum missed Dr. Black with the revolver but later killed him with the candlestick; Mrs. Peacock stabbed the cook, her former employee; Mrs. White strangled the maid out of jealousy and hatred for the latter's affair with her husband whom she had also killed; and Miss Scarlet clubbed the cop, whom she was bribing. The butler reveals that he is the real Dr. Black; the person that Plum killed was Dr. Black's butler. With his spies and informants disposed of (the maid, the cop, and the cook), he plans to continue blackmailing the guests. Rev. Green then draws his own revolver, kills Dr. Black, and reveals himself to be an undercover FBI agent, revealing his earlier admittance as a homosexual a ruse to get close to dr. Black. After telling the police chief he has killed Dr. Black in the hall with his revolver, Rev. Green says: "Okay, Chief, take 'em away! I'm gonna go home and play with my cat!"` + textFormats.setTextLink(`See Scoreboard`, "http://localhost:3000/score/scoreboard"))
}

module.exports = {
    updateUserScore,
    generateScoreboard,
    generateWinnerMessage,
}