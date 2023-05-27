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
      <button onClick={() => setIsFilling(false)}>Retour</button>
      <form onSubmit={handleSubmit}>
        <label>
          Minimum Level:
          <input
            type="number"
            value={minimumLevel}
            min={1}
            max={50}
            onChange={(e) => setMinimumLevel(Number(e.target.value))}
            />
        </label>
        <br />
        <label>
          Minimum Trophies:
          <input
            type="number"
            value={minimumTrophies}
            min={0}
            max={50000}
            onChange={(e) => setMinimumTrophies(Number(e.target.value))}
            />
        </label>
        <br />
        <label>
          Description (maximum 200 caractères):
          <textarea
            value={description}
            maxLength={200}
            onChange={(e) => setDescription(e.target.value)}
            />
        </label>
        <br />
        <button type="submit">{hasAnnonce ?
          'Modifier mon annonce' :
          'Créer mon annonce'}</button>
      </form>
    </>
  );
}

export default PlayerForm;