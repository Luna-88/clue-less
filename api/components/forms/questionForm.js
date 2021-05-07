const textFormats = require('../../view/textFormats')

function displayQuestionFormat(questionNumber, questionValue, question) {
    return `
    <input type="radio" name="${questionNumber}" value="${questionValue}">
    <label for="${questionValue}">
        ${question}
    </label><br>
     `
}

async function generateQuestionFormFormat(roomId, questionList) {
    const done = textFormats.displayParagraphFormat(textFormats.setTextLink(`Done`, `http://localhost:3000/rooms/${roomId}`))
    return `
    <head>
    <style>
        body {
            font-family: system-ui;
            font-size: 26px;
            text-align: left;
            margin: 30px;
        }
        .inputAsk {
            height:40px; 
            width:65px; 
            font-size:20px; 
            text-align:center; 
            margin:10px;
        }
    </style>
    </head>
    <body>
        ${textFormats.displayGameTitle()}
        <div>
            <form action="http://localhost:3000/rooms/${roomId}/questions/" method="post" style="margin: 0px">
                ${questionList.join('')}
                <input class="inputAsk" type="submit" value="Ask">
            </form>
        </div>
        ${done}
    </body>
    `
}

module.exports = {
    displayQuestionFormat,
    generateQuestionFormFormat,
}