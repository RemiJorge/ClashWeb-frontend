import {useState} from 'react';

function Password({password, setPassword, setPasswordError}) {

    const [showPassword, setShowPassword] = useState(false);
    const [validSize, setValidSize] = useState(false);
    const [validCharacter, setValidCharacter] = useState(false);
    const [validNumber, setValidNumber] = useState(false);
    const [validLetter, setValidLetter] = useState(false);

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    function handlePassword(value) {
        setPassword(value);
        const size = value.length >= 8 && value.length <= 20;
        const character = value.match(/^[a-zA-Z0-9\S]+$/) !== null;
        const number = value.match(/\d/) !== null;
        const letter = value.match(/[a-zA-Z]/) !== null;
        setValidSize(size);
        setValidCharacter(character);
        setValidNumber(number);
        setValidLetter(letter);
        setPasswordError(!size || !character || !number || !letter);
    }

    return (
        <div>
            <label>Nouveau mot de passe: </label>
            <input type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePassword(e.target.value)} />
            <button type="button" onClick={togglePassword}>
                    {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
            </button>
            <p className={validSize ? "correct" : "incorrect"}>Taille entre 8 et 20 caractères</p>
            <p className={validCharacter ? "correct" : "incorrect"}>Caractères autorisés: lettres, chiffres, spéciaux </p>
            <p className={validNumber ? "correct" : "incorrect"}>Au moins un chiffre</p>
            <p className={validLetter ? "correct" : "incorrect"}>Au moins une lettre</p>
            
        </div>
    )

}


export default Password