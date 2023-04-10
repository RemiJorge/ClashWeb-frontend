import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import Pseudo from './components/Pseudo'
import Password from './components/Password'

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Login() {
    const [pseudo, setPseudo] = useState('')
    const [password, setPassword] = useState('')
    const [wrongPseudoOrPassword, setWrongPseudoOrPassword] = useState(false)
    const navigate = useNavigate()

    function handleSummit(e) {
        e.preventDefault()
        const postData = {
            pseudo: pseudo,
            password: password
        }
        console.log(process.env)
        axios.post(`${serverUrl}/api/auth/login`, postData)
            .then((response) => {
                console.log('Response:', response.data);
                localStorage.setItem('authToken', response.data.token);
                navigate('/')
            })
            .catch((error) => {
                console.error('Error:', error.response.data.raison);
                if (error.response.data.raison === 'pseudo or password incorrect') {
                    setWrongPseudoOrPassword(true)
                }
            });
    }


    return (
        <div>
            <h1>Se connecter</h1>
            <form onSubmit={handleSummit}>
                <Pseudo pseudo={pseudo} setPseudo={setPseudo} setWrongPseudoOrPassword={setWrongPseudoOrPassword} />
                <Password password={password} setPassword={setPassword} setWrongPseudoOrPassword={setWrongPseudoOrPassword} />
                {wrongPseudoOrPassword && <p className='incorrect'>Pseudo ou mot de passe incorrect</p>}
                <Link to="/forgetpassword">Mot de passe oublié</Link>
                <input type="submit" value="Se connecter" />
            </form>
        </div>
    )
}

export default Login