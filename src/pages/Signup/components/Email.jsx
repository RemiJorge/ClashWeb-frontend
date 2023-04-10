import { useState } from 'react'
import croix from '../../../assets/validator/croix.png'
import check from '../../../assets/validator/check.png'
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
        <div>
            <label>Email: </label>
            <input type="email"
                value={email}
                onChange={(e) => {handleEmail(e.target.value)}}
                onBlur={() => setFirstTry(true)} />
            {firstTry  && (emailError ? 
                <div className='incorrect'> <p><img src={croix} alt='non' className='img-croix' /> Incorrect</p> </div>: 
                <div className='correct'> <img src={check} alt='oui' className='img-check' /> <p>Correct</p> </div>)}
            {emailAlreadyExist && <p className='incorrect'>Email déjà utilisé</p>}
        </div>
    )

}


export default Email