import { useState, useEffect} from "react";
import Loader from "../../../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function PlayerResponse({isResponse, setIsResponse}){
    const [responses, setResponses] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token_user = localStorage.getItem('authToken')
        axios.get(`${serverUrl}/api/messageannonce`, {
            headers: {
                Authorization: `Bearer ${token_user}`
            }
        })
            .then((response) => {
                console.log('Response:', response.data);
                setResponses(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
            });
    }, [])
    

    function handleClickRemove(idItem) {
        const token_user = localStorage.getItem('authToken')
        axios.delete(`${serverUrl}/api/messageannonce/${idItem}`, {
            headers: {
                Authorization: `Bearer ${token_user}`
            }
        })
            .then((resp) => {
                console.log('Response:', resp.data);
                setResponses(responses.filter((item) => item._id !== idItem))
            })
            .catch((error) => {
                console.error('Error:', error.resp.data);
            });
    }

    function handleClickPlayer(tag) {
        navigate(`/player/${tag.substring(1)}`)
    }

    return (
        <div>
            <h3 className="supercell-font ml">Proposion de clans:</h3>
            <button className="clash-button red-button ml" onClick={() => setIsResponse(false)}>Retour</button>
            {loading ? <Loader /> :
            responses.map((response) => {
                return (
                    <div className="manage-user-container rc0" key={response._id} onClick={() => handleClickPlayer(response.playerClan.tag)}>
                        <div className="manage-user-league"><img className="manage-league-icon" src={response.ClanId.badge.url} alt="badge"/></div>
                        <div className="supercell-font rc2">{response.ClanId.name}</div>
                        <div className="supercell-font rc2">{response.playerClan.name}</div>
                        <div className="supercell-font rc3">{response.message}</div>
                        <button className="clash-button red-button rc4" onClick={() => handleClickRemove(response._id)}>X</button>
                    </div>
            )})}
        </div>
    )
}

export default PlayerResponse;