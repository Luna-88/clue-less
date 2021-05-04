const textFormats = require('../../view/textFormats')

function generateUserLogoutMessage() {
    return `
    <head>
    <style>
        body {
            font-family: system-ui;
            font-size: 26px;
            text-align: left;
            margin: 30px;
        }
    </style>
    </head>
    <body>
    ${textFormats.displayParagraphFormat(`You logged out successfully ${textFormats.setTextLink(`Play Again`, "http://localhost:3000/")}`)}
    </body>
    `
}

module.exports = {
    generateUserLogoutMessage,
}