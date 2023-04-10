import {useState} from 'react';

function Pseudo({pseudo, setPseudo, setPseudoError, pseudoAlreadyExist, setPseudoAlreadyExist}) {

    const [validCharacter, setValidCharacter] = useState(false);
    const [validSize, setValidSize] = useState(false);

    function handlePseudo(value) {
        setPseudo(value);
        setPseudoAlreadyExist(false);
        const size = value.length >= 3 && value.length <= 15;
        const character = value.match(/^[a-zA-Z0-9_-]+$/) !== null;
        setValidSize(size);
        setValidCharacter(character);
        setPseudoError(!size || !character);
    }

    return (
        <div>
            <label>Pseudo: </label>
            <input type="text"
                value={pseudo}
                onChange={(e) => {handlePseudo(e.target.value)}}/>
            {pseudoAlreadyExist && <p className='incorrect'>Pseudo déjà utilisé</p>}
            <p className={validSize ? "correct" : "incorrect"}>Taille entre 3 et 15 caractères</p>
            <p className={validCharacter ? "correct" : "incorrect"}>Caractères autorisés: lettres, chiffres, _ et - </p>
        </div>
    )

}

export default Pseudo