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
        <div className='password-field'>
            <div className='signup-input-container ic1 login-mdp-container'>
                <input className='input login-mdp'
                    type={showPassword ? "text" : "password"}
                    id = "signup-password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => handlePassword(e.target.value)} />
                <div className="cut cut-long"></div>
                <label className="placeholder">Mot de passe</label> 
                <button className='clash-button blue-button mdp-button' type="button" onClick={togglePassword}>
                        {showPassword ? "Cacher" : "Afficher"}
                </button>
            </div>
            <div className={validSize ? "correct" : "incorrect"}>
                <p>Taille entre 8 et 20 caractères</p></div>
            <div className={validCharacter ? "correct" : "incorrect"}>
                <p>Caractères autorisés: lettres, chiffres, spéciaux </p></div>
            <div className={validNumber ? "correct" : "incorrect"}>
                <p>Au moins un chiffre</p></div>
            <div className={validLetter ? "correct" : "incorrect"}>
                <p>Au moins une lettre</p></div>
            
        </div>
    )

}


export default Password