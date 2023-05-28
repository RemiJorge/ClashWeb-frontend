import { useState } from 'react'
import '../../../styles/validator.css'

function Email({email, setEmail, emailError, setEmailError, emailAlreadyExist, setEmailAlreadyExist}) {

    const [firstTry, setFirstTry] = useState(false)

    function handleEmail(value) {
        setEmail(value)
        setEmailAlreadyExist(false)
        if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/) === null) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
    }

    return (
        <div className="input-container ic1">
            <input type="email"
                value={email}
                id="signup-email"
                className="input"
                placeholder=" "
                onChange={(e) => {handleEmail(e.target.value)}}
                onBlur={() => setFirstTry(true)} />
            <div class="cut"></div>
            <label for="signup-email" class="placeholder">Email</label>
            {emailAlreadyExist && <p className='incorrect'>Email déjà utilisé</p>}
            {firstTry  && (emailError ? 
                <div className='incorrect'><p> Incorrect</p> </div>: 
                <div className='correct'> <p>Correct</p> </div>)}
        </div>
    )

}


export default Email