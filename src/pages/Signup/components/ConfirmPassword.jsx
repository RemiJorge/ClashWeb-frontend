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
            <div >
                <div className="input-container ic1 login-mdp-container">
                    <input type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        id="signup-confirm-password"
                        className="input"
                        placeholder=" "
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <div class="cut cut-long"></div>
                    <label for="signup-confirm-password" class="placeholder">Confirmation</label>
                    <button type="button" className="clash-button blue-button mdp-button" onClick={togglePassword}> 
                            {showPassword ? "Cacher" : "Afficher"}
                    </button>
                </div>                    
                {samePassword ? 
                <div className="correct"><img src={check} alt="check" className="img-check" /><p>Les mots de passe sont identiques</p></div> : 
                <div className="incorrect"><img src={croix} alt="croix" className="img-croix" /><p>Les mots de passe ne sont pas identiques</p></div>
                }

            </div>
        )
    
}

export  default  ConfirmPassword
