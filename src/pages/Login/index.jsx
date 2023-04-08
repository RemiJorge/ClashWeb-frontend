import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Pseudo from './components/Pseudo'
import Password from './components/Password'


function Login() {
    const [pseudo, setPseudo] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function handleSummit(e) {
        e.preventDefault()
        console.log(pseudo, password)
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={handleSummit}>
                <Pseudo pseudo={pseudo} setPseudo={setPseudo} />
                <Password password={password} setPassword={setPassword} />
                <input type="submit" value="Se connecter" />
            </form>
        </div>
    )
}

export default Login