import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [pseudo, setPseudo] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    function togglePassword() {
        setShowPassword(!showPassword)
    }

    function handleSummit(e) {
        e.preventDefault()
        console.log(pseudo, password)
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={handleSummit}>
                <label>Pseudo: </label>
                <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)}/>
                <label>Mot de passe: </label>
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={togglePassword}>
                    {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                </button>
                <input type="submit" value="Se connecter" />
            </form>
        </div>
    )
}

export default Login