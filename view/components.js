const textFormats = require('./textFormats')

function askButton(text, roomId, reference) {
    return `
    ${textFormats.paragraphFormat(text)}
    <a href="http://localhost:3000/rooms/${roomId}/questions/${reference}">
    <button style="height:50px; width:80px; font-family:calibri; font-size:30px; text-align:center">Ask</button>
    </a>
    `
}


function accuseForm() {
    return `
    <body style="font-family:calibri; font-size:40px; text-align:justify">
        <form action="http://localhost:3000/accuse" method="post">
            <label for="character">Who killed him?</label><br>
            <input type="text" id="character" name="character" required placeholder="character" style="height:40px; width:250px font-family:calibri; font-size:30px; text-align:justify"><br>
            <label for="weapon">What weapon did they use?</label><br>
            <input type="text" id="weapon" name="weapon" required placeholder="weapon" style="height:40px; width:250px font-family:calibri; font-size:30px; text-align:justify"><br>
            <label for="room">Where did it happen?</label><br>
            <input type="text" id="room" name="room" required placeholder="room" style="height:40px; width:250px font-family:calibri; font-size:30px; text-align:justify"><br>
            <input type="submit" value="Accuse" style="margin:10px; height:50px;width:120px; font-family:calibri; font-size:30px; text-align:center">
        </form>
    </body>
    `
}


module.exports = { 
    askButton,
    accuseForm,
}