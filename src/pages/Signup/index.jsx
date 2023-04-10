import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Email from './components/Email'
import Pseudo from './components/Pseudo'
import Password from './components/Password'
import ConfirmPassword from './components/ConfirmPassword'
import './styles/index.css'


const serverUrl = process.env.REACT_APP_SERVER_URL

function Signup() {
    const [email, setEmail] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [emailError, setEmailError] = useState(true)
    const [pseudoError, setPseudoError] = useState(true)
    const [passwordError, setPasswordError] = useState(true)
    const [confirmPasswordError, setConfirmPasswordError] = useState(true)
    const [emailAlreadyExist, setEmailAlreadyExist] = useState(false)
    const [pseudoAlreadyExist, setPseudoAlreadyExist] = useState(false)

    function handleSummit(e) {
        e.preventDefault()
        if (emailError || passwordError || confirmPasswordError || pseudoError) {
            console.log('error')
        }else {
            const postData = {
                email: email,
                pseudo: pseudo,
                password: password
            }
            axios.post(`${serverUrl}/api/auth/signup`, postData)
            .then((response) => {
                console.log('Response:', response.data);
                console.log('ok')
                navigate('/login')
            })
            .catch((error) => {
                console.error('Error:', error.response.data.raison);
                if (error.response.data.raison === 'email and pseudo already exist') {
                    setEmailAlreadyExist(true)
                    setPseudoAlreadyExist(true)
                }
                else if (error.response.data.raison === 'email already exist') {
                    setEmailAlreadyExist(true)
                }
                else if (error.response.data.raison === 'pseudo already exist') {
                    setPseudoAlreadyExist(true)
                }
            });
        }
    }   

    return (
        <div className='container'>
            <h1>S'inscrire</h1>
            <form onSubmit={handleSummit}>

                <Email email={email} setEmail={setEmail} emailError={emailError} setEmailError={setEmailError} emailAlreadyExist={emailAlreadyExist} setEmailAlreadyExist={setEmailAlreadyExist}/>

                <Pseudo pseudo={pseudo} setPseudo={setPseudo} setPseudoError={setPseudoError} pseudoAlreadyExist={pseudoAlreadyExist} setPseudoAlreadyExist={setPseudoAlreadyExist}/>

                <Password password={password} setPassword={setPassword} setPasswordError={setPasswordError} />

                <ConfirmPassword password={password} setConfirmPasswordError={setConfirmPasswordError} />

                <input type="submit" value="S'inscrire" />
            </form>
        </div>
    )
}

export default Signup