import { useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import Loader from '../../components/Loader'
import axios from 'axios'
import './style.css'


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



    return (
        <div>
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
                                <img src={playerData.league.icon.url} alt="trophée"/>
                            </div>
                            <div className="player-league-trophies">
                                <div className="player-league-name">{playerData.league.name}</div>
                                <div className="player-trophies">{playerData.trophies}</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="main-info-player-bottom">
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