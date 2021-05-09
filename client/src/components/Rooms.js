import { useEffect, useState } from 'react'
import GameTitle from './GameTitle'
import ballroom from '../images/ballroom.jpg'
import billiardRoom from '../images/billiard-room.jpg'
import conservatory from '../images/conservatory.jpg'
import diningRoom from '../images/dining-room.jpg'
import hall from '../images/hall.jpg'
import kitchen from '../images/kitchen.jpg'
import library from '../images/library.jpg'
import lounge from '../images/lounge.jpg'
import study from '../images/study.jpg'

const roomObjects = {
    "ballroom": ballroom,
    "billiard-room": billiardRoom,
    "conservatory": conservatory,
    "dining-room": diningRoom,
    "hall": hall,
    "kitchen": kitchen,
    "library": library,
    "lounge": lounge,
    "study": study
}

export default function Room() {
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        const getRooms = async () => {
            let response = await fetch('/rooms')
            let roomList = await response.json()
            setRooms(roomList)
        }
        getRooms()
    }, [])
    return (
        <div>
            <GameTitle />
            <div className="room-container">
                {Object.keys(rooms).map(key => (
                    <div className="room">
                        <img className="room-img" src={roomObjects[rooms[key]]} alt="room" /><br />
                        <div className="room-name">
                            <p><a href={`/rooms/${rooms[key]}`}>{rooms[key].replace("-", " ")}</a></p>
                        </div>
                    </div>))}
            </div>
            <div className="room-footer">
                <footer>
                    <a className="quit" href="http://localhost:3000/quit-logout">Quit</a>
                    <a className="save" href="http://localhost:3000/save-logout">Save and Quit</a>
                    <a href="http://localhost:3000/accuse">Accuse</a>
                </footer>
            </div>
        </div >
    )
}