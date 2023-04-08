import {useState} from "react";

function Password({password, setPassword}){

    const [showPassword, setShowPassword] = useState(false)

    function togglePassword() {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <label>Mot de passe: </label>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="button" onClick={togglePassword}>
                {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
            </button>
        </div>
    )
}

export default Password