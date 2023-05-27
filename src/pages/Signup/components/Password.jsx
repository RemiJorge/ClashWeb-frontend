import {useState} from 'react';
import croix from '../../../assets/validator/croix.png'
import check from '../../../assets/validator/check.png'
import open from '../../../assets/cadena/open.png'
import close from '../../../assets/cadena/close.png'

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
            <label className='password-label'>Mot de passe: </label>
            <div className='password-full-input'>
                <input className='password-input'
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => handlePassword(e.target.value)} />
                <button className='password-button' type="button" onClick={togglePassword}>
                        {showPassword ?  <img src={open} alt="A" className='cadena-open'/> : <img src={close} alt="C" className='cadena-close'/>}
                </button>
            </div>
            <div className={validSize ? "correct" : "incorrect"}>
                {validSize ? <img src={check} alt="check" className='img-check' /> : <img src={croix} alt="check" className='img-croix'/>}
                <p>Taille entre 8 et 20 caractères</p></div>
            <div className={validCharacter ? "correct" : "incorrect"}>
                {validCharacter ? <img src={check} alt="check" className='img-check' /> : <img src={croix} alt="check" className='img-croix'/>}
                <p>Caractères autorisés: lettres, chiffres, spéciaux </p></div>
            <div className={validNumber ? "correct" : "incorrect"}>
                {validNumber ? <img src={check} alt="check" className='img-check' /> : <img src={croix} alt="check" className='img-croix'/>}
                <p>Au moins un chiffre</p></div>
            <div className={validLetter ? "correct" : "incorrect"}>
                {validLetter ? <img src={check} alt="check" className='img-check' /> : <img src={croix} alt="check" className='img-croix'/>}
                <p>Au moins une lettre</p></div>
            
        </div>
    )

}


export default Password