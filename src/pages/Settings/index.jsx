import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Settings(){

    const [playerTag, setPlayerTag] = useState(localStorage.getItem('playerTag') || null)
    const navigate = useNavigate()

    console.log(playerTag)
    
    function handleClickCreate(){
        navigate('/logincoc')
    }
    
    function handleClickDelete(){
        const token_user = localStorage.getItem('authToken')
        axios.delete(`${serverUrl}/api/coc/player`, {
            headers: {
                Authorization: `Bearer ${token_user}`
            }
        })
            .then((response) => {
                console.log('Response:', response.data);
                localStorage.removeItem('playerTag')
                setPlayerTag(null)
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
            });
    }


    return (
        <div className="page-container">
            <h1>Settings</h1>
            <Link to="/changepassword">Changer de mot de passe</Link>
            {playerTag != null ? <button className="clash-button red-button" onClick={handleClickDelete}>Supprimer le Joueur</button>:
            <button className="clash-button green-button" onClick={handleClickCreate}>Lier son compte clash</button>}
        
        </div>
    )
}

export default Settings