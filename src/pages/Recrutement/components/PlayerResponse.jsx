import { useState, useEffect} from "react";
import Loader from "../../../components/Loader";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function PlayerResponse({isResponse, setIsResponse}){
    const [responses, setResponses] = useState([])
    const [loading, setLoading] = useState(true)
    
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
    


    return (
        <div>
            <h3>PlayerResponse</h3>
            <button className="clash-button red-button" onClick={() => setIsResponse(false)}>Retour</button>
            {loading ? <Loader /> :
            responses.map((response) => {
                return (
                    <div className="container-reponse-player" key={response._id}>
                        <div>{response.ClanId.name}</div>
                        <div>{response.ClanId.level}</div>
                        <div>{response.playerClan.name}</div>
                        <div>{response.playerClan.expLevel}</div>
                    </div>
            )})}
        </div>
    )
}

export default PlayerResponse;