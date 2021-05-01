const textFormats = require('../../view/textFormats')

function displayAnswerFormat(text) {
    return `
    <div style="margin:auto;width:35%;border-radius:90px;border:3px solid blue;padding:30px">
        ${textFormats.displayParagraphFormat(`"${text}"`)}
    </div>
    <div style="margin:auto; background: white; width:0; height:0; border-top: 50px solid blue; border-left: 30px solid transparent;">
    </div>
    `
}

module.exports = {
    displayAnswerFormat,
}