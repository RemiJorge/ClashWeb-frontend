import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Email from './components/Email'
import Pseudo from './components/Pseudo'
import Password from './components/Password'
import ConfirmPassword from './components/ConfirmPassword.jsx'


function Signup() {
    const [email, setEmail] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const [emailError, setEmailError] = useState(true)
    const [pseudoError, setPseudoError] = useState(true)
    const [passwordError, setPasswordError] = useState(true)
    const [confirmPasswordError, setConfirmPasswordError] = useState(true)

    function handleSummit(e) {
        e.preventDefault()
        if (emailError || passwordError || confirmPasswordError || pseudoError) {
            console.log('error')
        }else {
            //TODO : request server with axios to create user
            console.log('ok')
            navigate('/')
        }
    }   

    return (
        <div>
            <h1>S'inscrire</h1>
            <form onSubmit={handleSummit}>

                <Email email={email} setEmail={setEmail} emailError={emailError} setEmailError={setEmailError} />

                <Pseudo pseudo={pseudo} setPseudo={setPseudo} setPseudoError={setPseudoError} />

                <Password password={password} setPassword={setPassword} setPasswordError={setPasswordError} />

                <ConfirmPassword password={password} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} setConfirmPasswordError={setConfirmPasswordError} />

                <input type="submit" value="S'inscrire" />
            </form>
        </div>
    )
}

export default Signup