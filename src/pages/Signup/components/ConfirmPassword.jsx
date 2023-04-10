import {useEffect, useState} from 'react'
import croix from '../../../assets/validator/croix.png'
import check from '../../../assets/validator/check.png'
import '../../../styles/validator.css'

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
                {samePassword ? 
                <div className="correct"><img src={check} alt="check" className="img-check" /><p>Les mots de passe sont identiques</p></div> : 
                <div className="incorrect"><img src={croix} alt="croix" className="img-croix" /><p>Les mots de passe ne sont pas identiques</p></div>
                }

            </div>
        )
    
}

export  default  ConfirmPassword
