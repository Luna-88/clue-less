const textFormats = require('../view/textFormats')

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
            <input type="password" id="password" name="password" required placeholder="goodboyGhost" style="height:40px; width:250px font-family:futura; font-size:20px"><br>
            <input type="checkbox" onclick="showPassword()"><label for="showPassword" style="font-family:futura; font-size:18px">Show Password</label>
            <div class="registerButton">
                <input type="submit" value="${buttonLabel}" style="margin:10px; height:40px;width:110px; font-family:futura; font-size:25px; text-align:center">
                ${signinDiv}
            </div>
        </form> 
    </div>
    <script>
        function showPassword() {
            let x = document.getElementById("password")
            if (x.type === "password") {
                x.type = "text"
            } else {
                x.type = "password"
            }
        }
    </script>
    `
}

function generateUserLogoutMessage() {
    return textFormats.displayParagraphFormat(`You logged out successfully
    ${textFormats.setTextLink(`Play Again`, "http://localhost:3000/")}`)
}

module.exports = {
    generateUserForm,
    generateUserLogoutMessage,
}