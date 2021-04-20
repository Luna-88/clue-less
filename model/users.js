const db = require('./db')
const textFormats = require('../view/textFormats')


async function createUser(firstName, lastName) {
    db.getCollection("users").then((user) => {
        return user.insertOne({
            firstName, 
            lastName, 
            accuseCount,
        })      
    })
}


function userForm() {
    return textFormats.gameTitle()+`
    <head>
    <style>
    .registerButton { 
        text-align: center 
    }
    </style>
    </head>
    <p style="text-align: center">Please, register to continue</p>
    <body style="font-family:futura; font-size:30px; text-align:justify">
    <div style="margin:auto;width:252px;border:3px solid grey;padding:10px">
        <form action="http://localhost:3000/" method="post">
            <label for="firstName">First name:</label><br>
            <input type="text" id="firstName" name="firstName" required placeholder="Jon" style="height:40px; width:250px font-family:futura; font-size:20px"><br>
            <label for="lastName">Last name:</label><br>
            <input type="text" id="lastName" name="lastName" required placeholder="Snow" style="height:40px; width:250px font-family:futura; font-size:20px"><br>
            <div class="registerButton">
                <input type="submit" value="Register!" style="margin:10px; height:40px;width:110px; font-family:futura; font-size:25px; text-align:center">
            </div>
        </form> 
    </div>
    `
}


module.exports = {
    createUser,
    userForm,
}