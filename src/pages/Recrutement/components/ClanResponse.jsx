import { useState, useEffect } from "react";
import Loader from "../../../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const serverUrl = process.env.REACT_APP_SERVER_URL;

function ClanResponse({ isResponse, setIsResponse }) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const token_user = localStorage.getItem('authToken');
    axios.get(`${serverUrl}/api/messageclan`, {
      headers: {
        Authorization: `Bearer ${token_user}`
      }
    })
      .then((response) => {
        console.log('Response:', response.data);
        setResponses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
      });
  }, []);

  function handleClickRemove(idItem) {
    const token_user = localStorage.getItem('authToken');
    axios.delete(`${serverUrl}/api/messageclan/${idItem}`, {
      headers: {
        Authorization: `Bearer ${token_user}`
      }
    })
      .then((resp) => {
        console.log('Response:', resp.data);
        setResponses(responses.filter((item) => item._id !== idItem));
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
      <h3 className="supercell-font ml">Proposition de joueur:</h3>
      <button className="clash-button red-button ml" onClick={() => setIsResponse(false)}>Retour</button>
      <div>
        {loading ? <Loader /> :
          responses.map((response) => {
            return (
              <div className="manage-user-container rc0" key={response._id} onClick={() => handleClickPlayer(response.player.tag)}>
                <div className="manage-user-league rc1">{response.player != null && <img className="manage-league-icon" src={response.player.league.icon.url} alt="league" />}</div>
                <div className="response-player-xp rc1">{response.player.expLevel}</div>
                <div className="supercell-font rc2">{response.player.name}</div>
                <div className="supercell-font rc3">{response.message}</div>
                <button className="clash-button red-button rc4" onClick={() => handleClickRemove(response._id)}>X</button>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ClanResponse;
