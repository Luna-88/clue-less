import GameTitle from './GameTitle'
import AlreadyRegistered from './AlreadyRegistered'

export default function UserForm({ actionForm, methodForm = "post", isRegistered = true }) {
    let signInDiv = ""
    let option = ""
    if (!isRegistered) {
        signInDiv = <AlreadyRegistered />
        option = "register"
    } else {
        signInDiv = ""
        option = "sign in"
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
                <form action={actionForm} method={methodForm}>
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
                        <input
                            className="user-button-input"
                            type="submit"
                            value={option}>
                        </input>
                    </div>
                    {signInDiv}
                </form>
            </div>
        </div>
    )
}