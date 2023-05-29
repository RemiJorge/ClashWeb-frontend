import { useState } from 'react';
import Loader from '../../../components/Loader';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

function AnnonceClan({ annonce }) {
  const [loading, setLoading] = useState(false);
  const [envoye, setEnvoye] = useState(null);
  const [writeMessage, setWriteMessage] = useState(false);
  const [message, setMessage] = useState('');
  const token_user = localStorage.getItem('authToken');


  function handleClickPostule() {
    setWriteMessage(true);
  }

  function handleClicCancel() {
    setWriteMessage(false);
  }

  function handleClickEnvoie() {
    setLoading(true);
    setWriteMessage(false);
    axios
      .post(
        `${serverUrl}/api/messageclan/`,
        { AnnonceClanId: annonce._id, message: message },
        {
          headers: {
            Authorization: `Bearer ${token_user}`,
          },
        }
      )
      .then((response) => {
        console.log('Response:', response.data);
        setEnvoye(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
        setLoading(false);
        setEnvoye(false);
      });
  }

  return (
    <div className="container-annonce">
      <div
        className="user-player-container"
      >
        <div className="user-clan-embleme"> <img src={annonce.clanId.badge.url} alt="embleme"/> </div>
        <div className="user-player-name"> {annonce.clanId.name} </div>
      </div>
      <p className="supercell-font">Hotel de Ville minimum: {annonce.minimumTh}</p>
      <p className="supercell-font">Trophées minimum: {annonce.minimumTrophies}</p>
      <p className="supercell-font">Description: {annonce.description}</p>
      {loading ? (
        <Loader />
      ) : envoye === true ? (
        <p>Message envoyé</p>
      ) : envoye === false ? (
        <p>Erreur lors de l'envoi du message</p>
      ) : writeMessage ? (
        <div className="container-message">
          <textarea
            className="message"
            placeholder="Votre message"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="container-button">
            <div className="clash-button green-button" onClick={handleClickEnvoie}>
              Envoyer
            </div>
            <div className="clash-button red-button" onClick={handleClicCancel}>
              Annuler
            </div>
          </div>
        </div>
      ) : (
        <div className="clash-button green-button" onClick={handleClickPostule}>
          Postuler
        </div>
      )}
    </div>
  );
}

export default AnnonceClan;
