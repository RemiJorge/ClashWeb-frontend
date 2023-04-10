import {useEffect, useState} from 'react'

function ConfirmPassword({password, setConfirmPasswordError}) {
    
        const [confirmPassword, setConfirmPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [samePassword, setSamePassword] = useState(false);
    
        function togglePassword() {
            setShowPassword(!showPassword);
        }
    
        useEffect(() => {
            setSamePassword(confirmPassword === password && confirmPassword !== "");
            setConfirmPasswordError(confirmPassword !== password || confirmPassword === "");
        }, [password, confirmPassword, setConfirmPasswordError])

        return (
            <div>
                <label>Confirmer le mot de passe: </label>
                <input type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="button" onClick={togglePassword}> 
                        {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                </button>
                <p className={samePassword ? "correct" : "incorrect"}>Les mots de passe {samePassword ? "sont" : "ne sont pas"} identiques</p>
            </div>
        )
    
}

export  default  ConfirmPassword
