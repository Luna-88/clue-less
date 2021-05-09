import { useEffect, useState } from 'react'
import GameTitle from './GameTitle'

export default function RoomInspection() {
    const [inspection, setInspection] = useState([])
    useEffect(() => {
        const getInspection = async () => {
            let response = await fetch('/rooms/:roomId')
            let inspectionNotes = await response.json()
            setInspection(inspectionNotes)
        }
        getInspection()
    }, [])
    return (
        <div>
            <GameTitle />
            <p>You go into the {inspection.room.replace("-", " ")} and look around...</p>
            <p>{inspection.character}</p>
            <p>{inspection.weapon}</p>
            <p><a href={`http://localhost:3000/rooms/${inspection.room}/questions`}>{inspection.option[0]}</a></p>
            <p><a href="../accuse">Accuse</a></p>
            <p><a href="/rooms">Change Room</a></p>
        </div>
    )
}