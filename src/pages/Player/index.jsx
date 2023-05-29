import { useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import Loader from '../../components/Loader'
import axios from 'axios'
import './style.css'


import th1 from '../../assets/Town/town-hall-1.png';
import th5 from '../../assets/Town/town-hall-5.png';
import th6 from '../../assets/Town/town-hall-6.png';
import th3 from '../../assets/Town/town-hall-3.png';
import th7 from '../../assets/Town/town-hall-7.png';
import th4 from '../../assets/Town/town-hall-4.png';
import th2 from '../../assets/Town/town-hall-2.png';
import th8 from '../../assets/Town/town-hall-8.png';
import th9 from '../../assets/Town/town-hall-9.png';
import th10 from '../../assets/Town/town-hall-10.png';
import th11 from '../../assets/Town/town-hall-11.png';
import th12 from '../../assets/Town/town-hall-12.png';
import th12_2 from '../../assets/Town/town-hall-12-2.png';
import th12_3 from '../../assets/Town/town-hall-12-3.png';
import th12_4 from '../../assets/Town/town-hall-12-4.png';
import th12_5 from '../../assets/Town/town-hall-12-5.png';
import th13 from '../../assets/Town/town-hall-13.png';
import th13_2 from '../../assets/Town/town-hall-13-2.png';
import th13_3 from '../../assets/Town/town-hall-13-3.png';
import th13_4 from '../../assets/Town/town-hall-13-4.png';
import th13_5 from '../../assets/Town/town-hall-13-5.png';
import th14 from '../../assets/Town/town-hall-14.png';
import th14_2 from '../../assets/Town/town-hall-14-2.png';
import th14_3 from '../../assets/Town/town-hall-14-3.png';
import th14_4 from '../../assets/Town/town-hall-14-4.png';
import th14_5 from '../../assets/Town/town-hall-14-5.png';
import th15 from '../../assets/Town/town-hall-15.png';
import th15_2 from '../../assets/Town/town-hall-15-2.png';
import th15_3 from '../../assets/Town/town-hall-15-3.png';
import th15_4 from '../../assets/Town/town-hall-15-4.png';
import th15_5 from '../../assets/Town/town-hall-15-5.png';

import trophies_icon from '../../assets/profil/Trophy.webp';
import star from '../../assets/profil/star.png';


const serverUrl = process.env.REACT_APP_SERVER_URL;

function Player(){
    const [playerData, setPlayerData] = useState({})
    const [erreur, setErreur] = useState(true)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const {id} = useParams()
    console.log(id)

    useEffect(() => {
        const token_user = localStorage.getItem('authToken')
        let url = `${serverUrl}/api/coc/player`
        if (id) {
            url = `${serverUrl}/api/coc/player/${id}`
        }
        console.log(url);
        axios.get(url, {
            headers: {
            'Authorization': `Bearer ${token_user}`
            }
        })
        .then((response) => {
            setErreur(false);
            console.log('Response:', response.data);
            setPlayerData(response.data)
            setLoading(false)

        }
        )
        .catch((error) => {
            if (error.response.status === 401 && error.response.data.message === 'Invalid token') {
                navigate('/login');
            } else if (error.response.status === 401 && error.response.data.message === 'Connexion à supercell requise') {
                navigate('/logincoc');
            }
            console.error('Error:', error.response.data);
        });
    }, [navigate, id])


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
    
      const townHallImagePath = getTownHallImagePath(playerData.townHallLevel, playerData.townHallWeaponLevel);

    return (
        <div className="page-container">
            {loading ? <Loader /> :
            erreur ? <p>Erreur lors de chargement des données, réessayer plus tard</p> :
            <>
            <div className="main-info-player">
                <div className="main-info-player-top">
                    <div className="left-info-player">
                        <div className="container-xp-name">
                            <div className="player-xp">{playerData.expLevel}</div>
                            <div className="container-name-tag-role">
                                <div className="player-name">{playerData.name}</div>
                                <div className="player-tag">{playerData.tag}</div>
                                <div className="player-role">{playerData.role}</div>
                            </div>
                        </div>
                        <div className="container-townhall">
                        <img className="player-townHall" src={townHallImagePath} alt="town-hall-img" />
                        </div>
                    </div>
                    <div className="middle-info-player">
                        <div className="clan-name">
                            {playerData.clan ? playerData.clan.name : "Pas de clan"}
                        </div>
                        <div className="clan-badge">
                            {playerData.clan ? <img className="clan-badge-img" src={playerData.clan.badge.url} alt="badge"/> : ""}
                        </div>
                    </div>
                    <div className="right-info-player">
                        <div className="container-trophies">
                            <div className="league-img">
                                <img src={playerData.league.icon.url} alt="league"/>
                            </div>
                            <div className="player-league-trophies">
                                <div className="player-league-name">{playerData.league.name}</div>
                                <div className="player-trophies"><img src={trophies_icon} alt="trophies" />{playerData.trophies}</div>
                            </div>
                        </div>
                        <div className="container-record">
                            <div className="player-record-text">Record absolu :</div>
                            <div className="player-record">
                                <img src={trophies_icon} alt="trophies" /><p>{playerData.bestTrophies}</p> 
                            </div>
                        </div>
                        <div className="container-star">
                            <div className="player-star-text">Etoiles de guerre gagnées :</div>
                            <div className="player-star">
                                <img src={star} alt="star" /><p>{playerData.warStars}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-info-player-bottom">
                    <div className="info-player-attaques"></div>
                    <div className="text-info"> Troupes données : </div>
                    <div className="valeur-info"> {playerData.donations} </div>
                    <div className="text-info"> Troupes reçues : </div>
                    <div className="valeur-info"> {playerData.donationsReceived} </div>
                    <div className="text-info"> Attaques gagnées : </div>
                    <div className="valeur-info"> {playerData.attackWins} </div>
                    <div className="text-info"> Défense gagnées : </div>
                    <div className="valeur-info"> {playerData.defenseWins} </div>
                </div>
            </div>
            </>
            }
        </div>
    )
}

export default Player