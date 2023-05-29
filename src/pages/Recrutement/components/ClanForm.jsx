import { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

function ClanForm({ setIsFilling, hasAnnonce, setHasAnnonce, annonce, setAnnonce }) {
  const [minimumTh, setMinimumTh] = useState(1);
  const [minimumTrophies, setMinimumTrophies] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    console.log('hasAnnonce:', hasAnnonce);
    console.log('annonce:', annonce);
    if (hasAnnonce) {
      if (annonce.minimumTh) setMinimumTh(annonce.minimumTh);
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
      minimumTh,
      minimumTrophies,
      description: truncatedDescription,
    };

    if (!hasAnnonce) {
      axios.post(`${serverUrl}/api/annonceclan`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
      })
        .then((response) => {
          console.log('Response:', response.data);
          setHasAnnonce(true);
          setAnnonce(requestBody);
          setIsFilling(false);
        })
        .catch((error) => {
          console.error('Error:', error.response.data);
        });
    } else {
      axios.put(`${serverUrl}/api/annonceclan`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
      })
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
        <div className="form-section-titre supercell-font"> Critères pour les joueurs que vous recherchez </div>
        <div className="form-section-nombre ic1">
          <label className='supercell-font'>
            Hotel de Ville minimum:
          </label>
            <input
              type="number"
              className='input-number'
              value={minimumTh}
              min={1}
              max={50}
              onChange={(e) => setMinimumTh(Number(e.target.value))}
            />
        </div>
        <div className="form-section-nombre ic1">
          <label className='supercell-font'>
            Minimum Trophies:
          </label>
          <input
            type="number"
            className='input-number'
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
          <button className="clash-button green-button" type="submit">
            {hasAnnonce ? 'Modifier ma proposition' : 'Créer ma proposition'}
          </button>
          <button className="clash-button red-button" onClick={() => setIsFilling(false)}>Retour</button>
        </div>
      </form>
    </>
  );
}

export default ClanForm;
