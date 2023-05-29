import {useState} from "react";

function Password({password, setPassword, setWrongEmailOrPassword}) {

    const [showPassword, setShowPassword] = useState(false)

    function togglePassword() {
        setShowPassword(!showPassword)
    }

    return (
        <div className="input-container ic1 login-mdp-container">
            <input type={showPassword ? "text" : "password"} 
                value={password} 
                id="login-mdp"
                className="input login-mdp"
                placeholder=" "
                onChange={(e) => {setPassword(e.target.value); setWrongEmailOrPassword(false)}}/>
            <div className="cut cut-long"></div>
            <label className="placeholder">Mot de passe</label>
            <button type="button" className="clash-button blue-button mdp-button" onClick={togglePassword}>
                {showPassword ? "Cacher" : "Afficher"}
            </button>
        </div>
    )
}

export default Password