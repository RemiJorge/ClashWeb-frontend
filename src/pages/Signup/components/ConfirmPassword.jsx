import {useEffect, useState} from 'react'
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
            <div className="password-field">
                <div className="signup-input-container ic1 login-mdp-container">
                    <input type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        id="signup-confirm-password"
                        className="input login-mdp"
                        placeholder=" "
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <div className="cut cut-long"></div>
                    <label className="placeholder">Confirmation</label>
                    <button type="button" className="clash-button blue-button mdp-button" onClick={togglePassword}> 
                            {showPassword ? "Cacher" : "Afficher"}
                    </button>
                </div>                    
                {samePassword ? 
                <div className="correct"><p>Les mots de passe sont identiques</p></div> : 
                <div className="incorrect"><p>Les mots de passe ne sont pas identiques</p></div>
                }

            </div>
        )
    
}

export  default  ConfirmPassword
