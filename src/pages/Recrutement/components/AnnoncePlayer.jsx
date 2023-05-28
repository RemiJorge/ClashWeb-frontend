import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import axios from 'axios';

import th1 from '../../../assets/Town/town-hall-1.png';
import th2 from '../../../assets/Town/town-hall-2.png';
import th3 from '../../../assets/Town/town-hall-3.png';
import th4 from '../../../assets/Town/town-hall-4.png';
import th5 from '../../../assets/Town/town-hall-5.png';
import th6 from '../../../assets/Town/town-hall-6.png';
import th7 from '../../../assets/Town/town-hall-7.png';
import th8 from '../../../assets/Town/town-hall-8.png';
import th9 from '../../../assets/Town/town-hall-9.png';
import th10 from '../../../assets/Town/town-hall-10.png';
import th11 from '../../../assets/Town/town-hall-11.png';
import th12 from '../../../assets/Town/town-hall-12.png';
import th12_2 from '../../../assets/Town/town-hall-12-2.png';
import th12_3 from '../../../assets/Town/town-hall-12-3.png';
import th12_4 from '../../../assets/Town/town-hall-12-4.png';
import th12_5 from '../../../assets/Town/town-hall-12-5.png';
import th13 from '../../../assets/Town/town-hall-13.png';
import th13_2 from '../../../assets/Town/town-hall-13-2.png';
import th13_3 from '../../../assets/Town/town-hall-13-3.png';
import th13_4 from '../../../assets/Town/town-hall-13-4.png';
import th13_5 from '../../../assets/Town/town-hall-13-5.png';
import th14 from '../../../assets/Town/town-hall-14.png';
import th14_2 from '../../../assets/Town/town-hall-14-2.png';
import th14_3 from '../../../assets/Town/town-hall-14-3.png';
import th14_4 from '../../../assets/Town/town-hall-14-4.png';
import th14_5 from '../../../assets/Town/town-hall-14-5.png';
import th15 from '../../../assets/Town/town-hall-15.png';
import th15_2 from '../../../assets/Town/town-hall-15-2.png';
import th15_3 from '../../../assets/Town/town-hall-15-3.png';
import th15_4 from '../../../assets/Town/town-hall-15-4.png';
import th15_5 from '../../../assets/Town/town-hall-15-5.png';



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

    const imageMap = {
        '1': th1,
        '2': th2,
        '3': th3,
        '4': th4,
        '5': th5,
        '6': th6,
        '7': th7,
        '8': th8,
        '9': th9,
        '10': th10,
        '11': th11,
        '12': th12,
        '12_2': th12_2,
        '12_3': th12_3,
        '12_4': th12_4,
        '12_5': th12_5,
        '13': th13,
        '13_2': th13_2,
        '13_3': th13_3,
        '13_4': th13_4,
        '13_5': th13_5,
        '14': th14,
        '14_2': th14_2,
        '14_3': th14_3,
        '14_4': th14_4,
        '14_5': th14_5,
        '15': th15,
        '15_2': th15_2,
        '15_3': th15_3,
        '15_4': th15_4,
        '15_5': th15_5,
      };

    const getTownHallImagePath = (level, weaponLevel) => {
        let imagePath = `${level}`;
        if (level >= 12 && level <= 15 && weaponLevel >= 2 && weaponLevel <= 5) {
          imagePath += `_${weaponLevel}`;
        }
        console.log("imagePath:", imagePath, typeof(imagePath))
        return imageMap[imagePath];
      };
    
      const townHallImagePath = getTownHallImagePath(annonce.playerId.townHallLevel, annonce.playerId.townHallWeaponLevel);
      console.log(annonce.playerId.townHallLevel, annonce.playerId.townHallWeaponLevel)
      console.log("town:", townHallImagePath)

    return (
        <div className="container-annonce">
            <div className="annonce-player-main-info-container">
                <div className="user-player-container" onClick={() => handleClickPlayer(annonce.playerId.tag)}>
                    <div className="user-player-xp"> {annonce.playerId.expLevel} </div>
                    <div className="user-player-name"> {annonce.playerId.name} </div>
                </div>
                <div className="annonce-player-trophies">
                    <img className="player-league-icon" src={annonce.playerId.league.icon.url} alt="league-icon" />
                    <div className="annonce-player-trophies-number supercell-font">{annonce.playerId.trophies}</div>
                </div>
            </div>
            <div className="player-townHall-container">
                <img className="player-townHall" src={townHallImagePath} alt="town-hall-img" />
            </div>
            <div className="annonce-player-critere">
                <p>Conditions pour le clan : </p>
                <p>Niveau minimum: {annonce.minimumLevel}</p>
                <p>Trophées minimum: {annonce.minimumTrophies}</p>
                <p>{annonce.description}</p>
            </div>
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