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
        <div className="password-field">
            <div className="signup-input-container ic1 login-mdp-container">
                <input type={showPassword ? "text" : "password"}
                        value={password}
                        className="input login-mdp"
                        placeholder=" "
                        onChange={(e) => handlePassword(e.target.value)} />
                <div class="cut cut-long"></div>
                <label className="placeholder">Nouveau MDP</label>
                <button type="button" className="clash-button blue-button mdp-button" onClick={togglePassword}>
                        {showPassword ? "Cacher" : "Afficher"}
                </button>
            </div>
            <p className={validSize ? "correct" : "incorrect"}>Taille entre 8 et 20 caractères</p>
            <p className={validCharacter ? "correct" : "incorrect"}>Caractères autorisés: lettres, chiffres, spéciaux </p>
            <p className={validNumber ? "correct" : "incorrect"}>Au moins un chiffre</p>
            <p className={validLetter ? "correct" : "incorrect"}>Au moins une lettre</p>
            
        </div>
    )

}


export default Password