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
            <div className="password-field">
                <div className="signup-input-container ic1 login-mdp-container">
                    <input type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        className='input login-mdp'
                        placeholder=" "
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <div className="cut cut-long"></div>
                    <label className="placeholder">Confirmation</label>
                    <button type="button" className="clash-button blue-button mdp-button" onClick={togglePassword}> 
                            {showPassword ? "Cacher" : "Afficher"}
                    </button>
                </div>
                <p className={samePassword ? "correct" : "incorrect"}>Les mots de passe {samePassword ? "sont" : "ne sont pas"} identiques</p>
            </div>
        )
    
}

export  default  ConfirmPassword
