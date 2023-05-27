import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

function AnnoncePlayer({annonce, isElder}){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [envoye, setEnvoye] = useState(null)
    const [writeMessage, setWriteMessage] = useState(false)
    const [message, setMessage] = useState('')
    const token_user = localStorage.getItem('authToken')

    function handleClickPlayer(tag) {
        navigate(`/player/${tag.substring(1)}`)
    }

    function handleClickPostule() {
        setWriteMessage(true)

    }

    function handleClicCancel(){
        setWriteMessage(false)
    }

    function handleClickEnvoie(){
        setLoading(true)
        setWriteMessage(false)
        axios.post(`${serverUrl}/api/messageannonce/`, {AnnoncePlayerId: annonce._id, message:message}, {
            headers: {
                Authorization: `Bearer ${token_user}`
            }
        })
            .then((response) => {
                console.log('Response:', response.data);
                setEnvoye(true)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
                setLoading(false)
                setEnvoye(false)
            });
    }

    return (
        <div className="container-annonce">
            <div className="user-player-container" onClick={() => handleClickPlayer(annonce.playerId.tag)}>
                <div className="user-player-xp"> {annonce.playerId.expLevel} </div>
                <div className="user-player-name"> {annonce.playerId.name} </div>
            </div>
            <p>{annonce.description}</p>
            <p>Minimum level: {annonce.minimumLevel}</p>
            <p>Minimum trophies: {annonce.minimumTrophies}</p>
            {
            loading ? <Loader /> :
            (envoye ===true) ? <p>Message envoyé</p> :
            (envoye === false) ? <p>Erreur lors de l'envoi du message</p> :
            writeMessage ?
                <div className="container-message">
                    <textarea className="message" placeholder="Votre message" onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div className="container-button">
                            <div className="clash-button green-button" onClick={handleClickEnvoie}>Envoyer</div>
                            <div className="clash-button red-button" onClick={handleClicCancel}>Annuler</div>
                    </div>
                </div> 
                : !isElder ? <p>Vous devez être au moins aîné pour proposer</p> 
                : <div className="clash-button green-button" onClick={handleClickPostule} > Proposer </div>
            }
        </div>
    )
}

export default AnnoncePlayer