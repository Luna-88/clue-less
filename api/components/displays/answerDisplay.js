const textFormats = require('../../view/textFormats')

function displayAnswerFormat(text) {
    return `
    <head>
    <style>
        body {
            font-family: system-ui;
            font-size: 26px;
            text-align: left;
            margin: 30px;
        }
        .textBubble {
            margin: auto;
            width: 35%;
            border-radius: 90px;
            border: 3px solid blue; 
            padding:30px;
        }
        .textBubbleTick {
            margin: auto; 
            background: white; 
            width: 0; 
            height: 0; 
            border-top: 50px solid blue; 
            border-left: 30px solid transparent;
        }
    </style>
    </head>
    <body>
        <div class="textBubble">
            ${textFormats.displayParagraphFormat(`"${text}"`)}
        </div>
        <div class="textBubbleTick">
        </div>
    </body>
    `
}

module.exports = {
    displayAnswerFormat,
}