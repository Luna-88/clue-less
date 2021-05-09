import { useEffect, useState } from 'react'
import GameTitle from './GameTitle'

export default function AccusationOptions() {
    const [options, setOptions] = useState([])
    useEffect(() => {
        const getOptions = async () => {
            let response = await fetch('/accuse')
            let optionList = await response.json()
            setOptions(optionList)
        }
        getOptions()
    }, [])
    console.log(options)
    return (
        <div>
            <GameTitle />
            <div class="accuse-form">
                <form action="http://localhost:3000/accuse" method="post">
                    <div class="accuse-options">
                        <label for="character">Who killed him?</label><br />
                        <select class="accuse-selects" name="character" id="character">
                            {options[0].character.map(character => <option value={character}>{character}</option>)}
                        </select><br />
                    </div>
                    <div class="accuse-options">
                        <label for="weapon">What weapon did they use?</label><br />
                        <select class="accuse-selects" name="weapon" id="weapon">
                            {options[1].weapon.map(weapon => <option value={weapon}>{weapon}</option>)}
                        </select><br />
                    </div>
                    <div class="accuse-options">
                        <label for="room">Where did it happen?</label><br />
                        <select class="accuse-selects" name="room" id="room">
                            {options[2].room.map(room => <option value={room}>{room}</option>)}
                        </select><br />
                    </div>
                    <div class="accuse-button">
                        <input class="accuse-button-input" type="submit" value="Accuse" />
                    </div>
                </form>
            </div>
            <a href="http://localhost:3000/rooms/">Lobby</a>
        </div >
    )
}