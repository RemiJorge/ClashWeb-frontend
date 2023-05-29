import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayerForm from "./PlayerForm";
import Loader from "../../../components/Loader";
import AnnoncePlayer from "./AnnoncePlayer";
import PlayerResponse from "./PlayerResponse";
import axios from "axios";
import "../styles/playerform.css";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Players() {

    //const role = localStorage.getItem('role')
    const [playersAnnonce, setPlayersAnnonce] = useState([])
    const [hasAnnonce, setHasAnnonce] = useState(false)
    const [annonce, setAnnonce] = useState([])
    const [isFilling, setIsFilling] = useState(false)
    const [isResponse, setIsResponse] = useState(false)
    const [isElder, setIsElder] = useState(false)
    const [hasPlayer, setHasPlayer] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token_user = localStorage.getItem('authToken')
        axios.get(`${serverUrl}/api/annonceplayer`, {
            headers: {
                Authorization: `Bearer ${token_user}`
            }
        })
            .then((response) => {
                console.log('Response:', response.data);
                setPlayersAnnonce(response.data)
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
            });


        axios.get(`${serverUrl}/api/annonceplayer/player`, {
            headers: {
                Authorization: `Bearer ${token_user}`
            }
        })
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data) {
                    setAnnonce(response.data)
                    setHasAnnonce(true)
                }
            }
            )
            .catch((error) => {
                console.error('Error:', error.response.data);
                if (error.response.status === 404) {
                    if (error.response.data.message === 'no annonce found') {
                        setHasPlayer(true)
                        setHasAnnonce(false)
                    }
                    if (error.response.data.message === 'no player linked') {
                        setHasPlayer(false)
                        setHasAnnonce(false)
                    }
                }
            })

        axios.get(`${serverUrl}/api/coc/player`, {
            headers: {
                Authorization: `Bearer ${token_user}`
            }
        })
            .then((response) => {
                console.log('Response:', response.data);
                setHasPlayer(true)
                setIsElder(response.data.role === 'elder' || response.data.role === 'coLeader' || response.data.role === 'leader')
                setLoading(false)
            }
            )
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false)
            }
            )

    
    }, [])

    function handleClickDelete() {
        const token_user = localStorage.getItem('authToken')
        axios.delete(`${serverUrl}/api/annonceplayer`, {
            headers: {
                Authorization: `Bearer ${token_user}`
            }
        })
            .then((response) => {
                console.log('Response:', response.data);
                setHasAnnonce(false)
                setAnnonce([])
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
            });
    }


    return(
        <div className="page-annonce">
            <h1 className="ic1">Joueur cherche Clan</h1>
            {loading ? <Loader /> :<>
            {isFilling ? <PlayerForm setIsFilling={setIsFilling} hasAnnonce={hasAnnonce} setHasAnnonce={setHasAnnonce} annonce={annonce} setAnnonce={setAnnonce} /> 
            : isResponse ? <PlayerResponse isResponse={isResponse} setIsResponse={setIsResponse} />
            : <> 
            <div className="container-annonces">
                <div className="mon-annonce">
                    <h3 className="supercell-font">Votre annonce</h3>
                    { hasPlayer ? 
                        (hasAnnonce ? <>
                            <button className="clash-button blue-button" onClick={() => setIsFilling(true)}>Modifier</button>
                            <button className="clash-button red-button" onClick={handleClickDelete} >Supprimer</button>
                            <button className="clash-button green-button" onClick={() => setIsResponse(true) }>Réponses</button>
                            </>
                            : <button className="clash-button green-button" onClick={() => setIsFilling(true)}>Créer</button>
                        )
                        : <>
                            <p>Connectez-vous pour créer une annonce</p>
                            <button className="clash-button green-button" onClick={() => navigate("/logincoc")}>Se connecter</button>
                        </>}
                </div>
                {playersAnnonce.map((annonce) => <AnnoncePlayer annonce={annonce} key={annonce._id} isElder={ isElder }/>)}
            </div>
            </>
            }</>}

        </div>
    )
}

export default Players;