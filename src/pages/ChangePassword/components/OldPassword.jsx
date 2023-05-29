import {useState} from "react";

function OldPassword({password, setPassword, setWrongPassword}) {

    const [showPassword, setShowPassword] = useState(false)

    function togglePassword() {
        setShowPassword(!showPassword)
    }

    return (
        <div className="input-container ic1 login-mdp-container password-field">
            <input type={showPassword ? "text" : "password"} 
                value={password}
                className="input login-mdp"
                placeholder=" "
                onChange={(e) => {setPassword(e.target.value); setWrongPassword(false)}}/>
            <div className="cut cut-long"></div>
            <label className="placeholder">Ancien MDP</label>
            <button type="button" className="clash-button blue-button mdp-button" onClick={togglePassword}>
                {showPassword ? "Cacher" : "Afficher"}
            </button>
        </div>
    )
}

export default OldPassword