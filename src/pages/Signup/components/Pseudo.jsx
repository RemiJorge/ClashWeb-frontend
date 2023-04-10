import {useState} from 'react';
import croix from '../../../assets/validator/croix.png'
import check from '../../../assets/validator/check.png'
import '../../../styles/validator.css'

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
            <div className={validSize ? "correct" : "incorrect"}>
                {<img src={validSize ? check : croix} alt={validSize ? 'oui' : 'non'} className='img-check' />}
                <p>Taille entre 3 et 15 caractères</p></div>
            <div className={validCharacter ? "correct" : "incorrect"}>
                {<img src={validCharacter ? check : croix} alt={validCharacter ? 'oui' : 'non'} className='img-check' />}
                <p>Caractères autorisés: lettres, chiffres, _ et -</p></div>
        </div>
    )

}

export default Pseudo