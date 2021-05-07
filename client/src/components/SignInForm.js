import { useHistory } from 'react-router-dom'
import GameTitle from './GameTitle'

export default function SignInForm() {
    const history = useHistory()
    function showPassword() {
        let x = document.getElementById("password")
        if (x.type === "password") {
            x.type = "text"
        } else {
            x.type = "password"
        }
    }
    function handleClick() {
        history.push("/intro")
    }
    return (
        <div>
            <GameTitle />
            <p className="register-text" >Please, sign in to play</p>
            <div className="user-form">
                <form>
                    <label htmlFor="username">Username:</label><br />
                    <input
                        className="user-input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        required
                    /><br />
                    <label htmlFor="password">Password:</label><br />
                    <input
                        className="user-input"
                        type="password"
                        id="password"
                        name="password"
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
                            type="submit"
                            onClick={handleClick}>Submit
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}