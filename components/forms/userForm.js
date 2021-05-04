const textFormats = require('../../view/textFormats')

function generateUserForm(action, method, buttonLabel, signin = false) {
    if (signin === false) {
        signinDiv = ""
        option = `sign in`
    } else {
        signinDiv = `
    <div class="signInSection">
        <p style="margin: 0">Already have an account? <a href="http://localhost:3000/signin">Sign in</a>.</p>
    </div>
    `
        option = `register`
    }
    return textFormats.displayGameTitle() + `
    <head>
    <style>
        body {
            font-family: system-ui;
            font-size: 26px;
            text-align: left;
            margin: 30px;
        }
        .userForm {
            margin: auto;
            width: 268px;
            border: 3px solid grey;
            padding: 10px;
        }
        .userInput {
            height: 40px; 
            width: 250px;
            font-size: 20px;
        }
        .userButton {
            text-align: center;
        }
        .userButtonInput { 
            text-align: center; 
            margin: 10px; 
            height: 40px;
            width: 110px; 
            font-size: 20px;
        }
        .signInSection {
            text-align: center; 
            font-size: 18px;
        }
    </style>
    </head>
    <p style="text-align: center">Please, ${option} to play</p>
    <body>
    <div class="userForm">
        <form action="${action}" method="${method}">
            <label for="username">Username:</label><br>
            <input class="userInput" type="text" id="username" name="username" required placeholder="username"><br>
            <label for="password">Password:</label><br>
            <input class="userInput" type="password" id="password" name="password" required placeholder="password"><br>
            <input type="checkbox" onclick="showPassword()"><label for="showPassword" style="font-size:18px">Show Password</label>
            <div class="userButton">
                <input class="userButtonInput" type="submit" value="${buttonLabel}">
            </div>
            ${signinDiv}
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

module.exports = {
    generateUserForm,
}