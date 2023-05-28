import {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import Email from './components/Email'
import Password from './components/Password'
import './style.css'

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [wrongEmailOrPassword, setWrongEmailOrPassword] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('isModo')
        localStorage.removeItem('isAdmin')
    }, [])

    function handleSummit(e) {
        e.preventDefault()
        const postData = {
            email: email,
            password: password
        }
        console.log(serverUrl);
        axios.post(`${serverUrl}/api/auth/login`, postData)
            .then((response) => {
                console.log('Response:', response.data);
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('isModo', response.data.isModo);
                localStorage.setItem('isAdmin', response.data.isAdmin);
                localStorage.setItem('role', response.data.role);
                if (response.data.playerTag !== null){
                    localStorage.setItem('playerTag', response.data.playerTag);
                }
                navigate('/')
            })
            .catch((error) => {
                console.error('Error:', error.response.data.raison);
                if (error.response.data.raison === 'email or password incorrect') {
                    setWrongEmailOrPassword(true)
                }
            });
    }


    return (
        <div className="page-connection">
            <h1 className="ic1">Se connecter</h1>
            <form onSubmit={handleSummit} className="formulaire">
                <Email email={email} setEmail={setEmail} setWrongEmailOrPassword={setWrongEmailOrPassword} />
                <Password password={password} setPassword={setPassword} setWrongEmailOrPassword={setWrongEmailOrPassword} />
                {wrongEmailOrPassword && <p className='incorrect'>email ou mot de passe incorrect</p>}
                <input type="submit" className="clash-button green-button ic1" value="Se connecter" />
                <Link to="/forgetpassword" className="clash-button blue-button ic1">Mot de passe oublié</Link>
            </form>
        </div>
    )
}

export default Login