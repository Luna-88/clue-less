const db = require('./db')
const textFormats = require('../view/textFormats')

let currentAccuseCountUser = []

async function createUser(username, password) {
    db.getCollection("users").then((user) => {
        return user.insertOne({
            username,
            password,
            accuseCount: 0
        })
    })
}

async function findUser(usernameBody, passwordBody) {
    const usersCollection = await db.getCollection('users')
    await usersCollection.find({ username: usernameBody, password: passwordBody })
        .project({ accuseCount: 1, "_id": 0 })
        .forEach(document => currentAccuseCountUser.push(document))
    return currentAccuseCountUser
}

function generateUserForm(action, method, buttonLabel, signin = false) {
    if (signin === false) {
        signinDiv = ""
        option = `sign in`
    } else {
        signinDiv = `
    <div style="text-align:center; font-family:futura; font-size:18px">
        <p>Already have an account? <a href="http://localhost:3000/signin">Sign in</a>.</p>
    </div>
    `
        option = `register`
    }
    return textFormats.displayGameTitle() + `
    <head>
    <style>
        .registerButton { 
            text-align: center 
        }
    </style>
    </head>
    <p style="text-align: center">Please, ${option} to play</p>
    <body style="font-family:futura; font-size:30px; text-align:justify">
    <div style="margin:auto;width:252px;border:3px solid grey;padding:10px">
        <form action="${action}" method="${method}">
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username" required placeholder="turncloak" style="height:40px; width:250px font-family:futura; font-size:20px"><br>
            <label for="password">Password:</label><br>
            <input type="text" id="password" name="password" required placeholder="goodboyGhost" style="height:40px; width:250px font-family:futura; font-size:20px"><br>
            <div class="registerButton">
                <input type="submit" value="${buttonLabel}" style="margin:10px; height:40px;width:110px; font-family:futura; font-size:25px; text-align:center">
                ${signinDiv}
            </div>
        </form> 
    </div>
    `
}

function getCurrentAccuseCountUser() {
    return currentAccuseCountUser
}

function resetCurrentAccuseCountUser() {
    return currentAccuseCountUser = []
}

function generateUserLogoutMessage() {
    return textFormats.displayParagraphFormat(`You logged out succesfully
    ${textFormats.setTextLink(`Play Again`, "http://localhost:3000/")}`)
}

function resetUserSignInInformation(userInformation) {
    return userInformation.length = 0
}

module.exports = {
    createUser,
    generateUserForm,
    findUser,
    getCurrentAccuseCountUser,
    resetCurrentAccuseCountUser,
    generateUserLogoutMessage,
    resetUserSignInInformation,
}