const textFormats = require('../../view/textFormats')

function displayUserScores(username, accuseCount) {
    return `
    <tr>
        <td>${username}</td>
        <td>${accuseCount}</td>
    </tr>`
}

function displayScoreboard(userScoreList) {
    return `
    <head>
    <style>
        body {
            font-family: system-ui;
            font-size: 26px;
            text-align: left;
            margin: 30px;
        }
        #users {
            text-align: center;
            border-collapse: collapse;
            width: 100%;
        }
        #users td, #users th {
            border: 1px solid #ddd;
            padding: 8px;
        }
        #users tr:nth-child(even) {
            background-color: white;
        }
        #users tr:hover {
            background-color: #ddd;
        }
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
        .quit {
            padding: 10px; 
            float: right;
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
        <p class="quit">
            ${textFormats.setTextLink("Quit", "http://localhost:3000/quit-logout")}
        </p>
    </footer>
    </body>
    `
}

module.exports = {
    displayUserScores,
    displayScoreboard,
}