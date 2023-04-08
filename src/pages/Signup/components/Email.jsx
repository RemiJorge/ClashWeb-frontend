import { useState } from 'react'
import '../styles/validator.css'

function Email({email, setEmail, emailError, setEmailError}) {

    const [firstTry, setFirstTry] = useState(false)

    function handleEmail(value) {
        setEmail(value)
        if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/) === null) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
    }

    return (
        <div>
            <label>Email: </label>
            <input type="email"
                value={email}
                onChange={(e) => {handleEmail(e.target.value)}}
                onBlur={() => setFirstTry(true)} />
            {firstTry  && (emailError ? <p className='incorrect'>Incorrect</p> : <p className='correct'>Valide</p>)}
        </div>
    )

}


export default Email