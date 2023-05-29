import { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

function PlayerForm({ setIsFilling, hasAnnonce, setHasAnnonce, annonce, setAnnonce }) {
  const [minimumLevel, setMinimumLevel] = useState(1);
  const [minimumTrophies, setMinimumTrophies] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    console.log('hasAnnonce:', hasAnnonce);
    console.log('annonce:', annonce)
    if (hasAnnonce) {
      if (annonce.minimumLevel) setMinimumLevel(annonce.minimumLevel);
      if (annonce.minimumTrophies) setMinimumTrophies(annonce.minimumTrophies);
      if (annonce.description) setDescription(annonce.description);
    }
  }, [hasAnnonce, annonce]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Tronquer la description si elle dépasse 200 caractères
    let truncatedDescription = description;
    if (truncatedDescription.length > 200) {
    truncatedDescription = truncatedDescription.substring(0, 200);
    }

    const requestBody = {
    minimumLevel,
    minimumTrophies,
    description: truncatedDescription,
    };
    console.log(!hasAnnonce)
    if (!hasAnnonce) {
      axios.post(`${serverUrl}/api/annonceplayer`, requestBody, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }})
      .then((response) => {
          console.log('Response:', response.data);
          setHasAnnonce(true);
          setAnnonce(requestBody);
          setIsFilling(false);
      }
      )
      .catch((error) => {
          console.error('Error:', error.response.data);
      }
      );
    } else {
      axios.put(`${serverUrl}/api/annonceplayer`, requestBody, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }})
      .then((response) => {
          console.log('Response:', response.data);
          setAnnonce(requestBody);
          setIsFilling(false);
      })
      .catch((error) => {
          console.error('Error:', error.response.data);
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="formulaire-player">
        <div className="form-section-titre supercell-font"> Critères pour le clan que vous recherchez </div>
        <div className="form-section-nombre ic1">
          <label className='supercell-font'>
            Niveau minimum : 
          </label>
            <input
              type="number"
              value={minimumLevel}
              className="input-number"
              min={1}
              max={20}
              onChange={(e) => setMinimumLevel(Number(e.target.value))}
              />
        </div>
        <div className="form-section-nombre ic1">
          <label className='supercell-font'>
            Trophées minimum :
          </label>
            <input
              type="number"
              className="input-number"
              value={minimumTrophies}
              min={0}
              max={50000}
              onChange={(e) => setMinimumTrophies(Number(e.target.value))}
              />
        </div>
        <div className="form-section-text ic1">
          <label className='supercell-font'>
            Description (maximum 200 caractères):
          </label>
            <textarea
              value={description}
              maxLength={200}
              onChange={(e) => setDescription(e.target.value)}
              />
        </div>
        <div className="form-section-button ic1 mb">
          <button className="clash-button green-button" type="submit">{hasAnnonce ?
            'Modifier mon annonce' :
            'Créer mon annonce'}</button>
          <button className="clash-button red-button" onClick={() => setIsFilling(false)}>Retour</button>
        </div>
      </form>
    </>
  );
}

export default PlayerForm;