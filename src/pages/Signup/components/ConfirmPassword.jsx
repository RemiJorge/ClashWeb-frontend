import {useState} from 'react'

function ConfirmPassword({password, confirmPassword, setConfirmPassword, setConfirmPasswordError}) {
    
        const [showPassword, setShowPassword] = useState(false);
        const [samePassword, setSamePassword] = useState(false);
    
        function togglePassword() {
            setShowPassword(!showPassword);
        }

        function handleConfirmPassword(value) {
            setConfirmPassword(value);
            setSamePassword(value === password);
            setConfirmPasswordError(value !== password);
        }
    
        return (
            <div>
                <label>Confirmer le mot de passe: </label>
                <input type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPassword(e.target.value)} />
                <button type="button" onClick={togglePassword}> 
                        {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                </button>
                <p className={samePassword ? "correct" : "incorrect"}>Les mots de passe {samePassword ? "sont" : "ne sont pas"} identiques</p>
            </div>
        )
    
}

export  default  ConfirmPassword
