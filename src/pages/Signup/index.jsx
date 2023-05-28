import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Email from './components/Email'
import Password from './components/Password'
import ConfirmPassword from './components/ConfirmPassword'
import './styles/index.css'


const serverUrl = process.env.REACT_APP_SERVER_URL

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [emailError, setEmailError] = useState(true)
    const [passwordError, setPasswordError] = useState(true)
    const [confirmPasswordError, setConfirmPasswordError] = useState(true)
    const [emailAlreadyExist, setEmailAlreadyExist] = useState(false)

    function handleSummit(e) {
        e.preventDefault()
        if (emailError || passwordError || confirmPasswordError) {
            console.log('error')
        }else {
            const postData = {
                email: email,
                password: password
            }
            axios.post(`${serverUrl}/api/auth/signup`, postData)
            .then((response) => {
                console.log('Response:', response.data);
                console.log('ok')
                const logData = {
                    email: email,
                    password: password
                }
                axios.post(`${serverUrl}/api/auth/login`, logData)
                    .then((response) => {
                        localStorage.setItem('authToken', response.data.token);
                        navigate('/')
                    })
                    .catch((error) => {
                        console.error('Error:', error.response.data.raison);
                        navigate('/');
                    });
            })
            .catch((error) => {
                console.error('Error:', error.response.data.raison);
                if (error.response.data.raison === 'email already exist') {
                    setEmailAlreadyExist(true)
                }
            });
        }
    }   

    return (
        <div className='page-connection'>
            <h1 className="ic1">S'inscrire</h1>
            <form className="formulaire" onSubmit={handleSummit}>

                <Email email={email} setEmail={setEmail} emailError={emailError} setEmailError={setEmailError} emailAlreadyExist={emailAlreadyExist} setEmailAlreadyExist={setEmailAlreadyExist}/>

                <Password password={password} setPassword={setPassword} setPasswordError={setPasswordError} />

                <ConfirmPassword password={password} setConfirmPasswordError={setConfirmPasswordError} />

                <input type="submit" className="clash-button green-button" value="S'inscrire" />
            </form>
        </div>
    )
}

export default Signup