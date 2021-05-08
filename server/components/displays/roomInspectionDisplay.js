const textFormats = require('../../view/textFormats')

function roomInspectionDisplay(room, ifCharacter, ifWeapon, options) {
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
        ${textFormats.displayGameTitle()} 
        ${textFormats.displayParagraphFormat(`
        You go into the ${room.room.replace("-", " ")} and look around...
        ${room.description}
        ${ifCharacter}
        ${ifWeapon}`)} 
        ${options}
        ${textFormats.displayParagraphFormat(textFormats.setTextLink(`Go to another room...`, 'http://localhost:3000/rooms'))}
    </body>
    `
}

module.exports = {
    roomInspectionDisplay,
}