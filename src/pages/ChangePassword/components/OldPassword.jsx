import {useState} from "react";

function OldPassword({password, setPassword, setWrongPassword}) {

    const [showPassword, setShowPassword] = useState(false)

    function togglePassword() {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <label>Ancien mot de passe: </label>
            <input type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => {setPassword(e.target.value); setWrongPassword(false)}}/>
            <button type="button" onClick={togglePassword}>
                {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
            </button>
        </div>
    )
}

export default OldPassword