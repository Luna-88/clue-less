const textFormats = require('../../view/textFormats')

function generateUserLogoutMessage() {
    return textFormats.displayParagraphFormat(`You logged out successfully
    ${textFormats.setTextLink(`Play Again`, "http://localhost:3000/")}`)
}

module.exports = {
    generateUserLogoutMessage,
}