import { useState, useEffect } from "react";
import Loader from "../../../components/Loader";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function ClanResponse({ isResponse, setIsResponse }) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h3>ClanResponse</h3>
      <button className="clash-button red-button" onClick={() => setIsResponse(false)}>Retour</button>
      {loading ? <Loader /> :
        responses.map((response) => {
          return (
            <div className="container-reponse-clan" key={response._id}>
              <div>{response.player.name}</div>
              <div>{response.player.expLevel}</div>
              <div>{response.message}</div>
              <button className="clash-button red-button" onClick={() => handleClickRemove(response._id)}>X</button>
            </div>
          )
        })}
    </div>
  )
}

export default ClanResponse;
