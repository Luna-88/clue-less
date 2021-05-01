const textFormats = require('../../view/textFormats')
const accusations = require('../../model/accusations')

async function getAccusationSelects(option, label) {
    const options = await accusations.getAccusationOptions(option)
    return `
    <div style="padding:5px">
        <label for="${option}">${label}</label><br>
        <select name="${option}" id="${option}" style="height:40px; width:250px font-family:futura; font-size:20px">
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
        .accuseButton { 
            text-align: center 
        }
    </style>
    </head>
    <body style="font-family:futura; font-size:30px; text-align:left">
    ${textFormats.displayGameTitle()}
        <div style="margin:auto;width:345px;border:3px solid grey;padding:10px">    
            <form action="http://localhost:3000/accuse" method="post">
                ${selectCharacters}
                ${selectWeapons}
                ${selectRooms}
                <div class="accuseButton">
                    <input type="submit" value="Accuse" style="margin:10px; height:40px;width:90px; font-family:futura; font-size:25px; text-align:center">
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