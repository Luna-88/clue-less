import { useState } from "react"
import GameTitle from './GameTitle'
import AlreadyRegistered from './AlreadyRegistered'

export default function UserForm({ api, isRegistered = true }) {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    async function handleClick(event) {
        console.log("click")
        event.preventDefault()
        const userRegistration = { username, password }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(userRegistration),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(api, requestOptions)
            .then(response => response.json())
    }

    let signInDiv = ""
    let option = ""
    let start = ""
    if (!isRegistered) {
        signInDiv = <AlreadyRegistered />
        option = "register"
    } else {
        signInDiv = ""
        option = "sign in"
        start = <a href='/intro'>Start</a>
    }
    function showPassword() {
        let x = document.getElementById("password")
        if (x.type === "password") {
            x.type = "text"
        } else {
            x.type = "password"
        }
    }
    return (
        <div>
            <GameTitle />
            <p className="register-text" >Please, {option} to play</p>
            <div className="user-form">
                <form>
                    <label htmlFor="username">Username:</label><br />
                    <input
                        className="user-input"
                        type="text"
                        id="username"
                        //name="username"
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                        placeholder="username"
                        required
                    /><br />
                    <label htmlFor="password">Password:</label><br />
                    <input
                        className="user-input"
                        type="password"
                        id="password"
                        //name="password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        placeholder="password"
                        required
                    /><br />
                    <input
                        type="checkbox"
                        id="checkbox"
                        onClick={showPassword}
                    />
                    <label id="show-password" htmlFor="checkbox">Show Password</label>
                    <div className="user-button">
                        <button
                            className="user-button-input"
                            onClick={handleClick}
                        >{option}
                        </button>
                    </div>
                    {signInDiv}
                </form>
            </div>
            {start}
        </div>
    )
}