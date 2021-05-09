const textFormats = require('../../view/textFormats')
const accusations = require('../../models/accusations')

async function getAccusationSelects(option, label) {
    const options = await accusations.getAccusationOptions(option)
    return `
    <div class="accuseOptions">
        <label for="${option}">${label}</label><br>
        <select class="accuseSelects" name="${option}" id="${option}">
            ${options}
        </select><br>
    </div>
    `
}

async function generateAccusationForm() {
    const selectCharacters = await getAccusationSelects("character", "Who killed him?")
    const selectWeapons = await getAccusationSelects("weapon", "What weapon did they use?")
    const selectRooms = await getAccusationSelects("room", "Where did it happen?")
    return `
    <head>
    <style>
        body {
            font-family: system-ui;
            font-size: 26px;
            text-align: left;
            margin: 30px;
        }
        .accuseForm {
            margin: auto;
            width: 345px;
            border: 3px solid grey;
            padding: 10px;
        }
        .accuseOptions {
            padding: 5px
        }
        .accuseSelects {
            height: 40px; 
            width: 250px; 
            font-size: 20px;
        }
        .accuseButton { 
            text-align: center; 
        }
        .accuseButtonInput { 
            text-align: center; 
            margin: 10px; 
            height: 40px;
            width: 90px; 
            font-size: 20px;
        }
    </style>
    </head>
    <body>
    ${textFormats.displayGameTitle()}
        <div class="accuseForm">    
            <form action="http://localhost:3000/accuse" method="post">
                ${selectCharacters}
                ${selectWeapons}
                ${selectRooms}
                <div class="accuseButton">
                    <input class="accuseButtonInput" type="submit" value="Accuse">
                </div>
            </form>
        </div>
        ${textFormats.displayParagraphFormat(textFormats.setTextLink(`Go Back to Rooms`, `http://localhost:3000/rooms/`))}
    </body>
    `
}

module.exports = {
    generateAccusationForm,
}