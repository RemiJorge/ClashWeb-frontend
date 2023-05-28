import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Tag from './components/Tag'
import Token from './components/Token'
import './style.css'

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Login() {
    const [tag, setTag] = useState('')
    const [token, setToken] = useState('')
    const [wrongTagOrToken, setWrongTagOrToken] = useState(false)
    const navigate = useNavigate()

    function handleSummit(e) {
        e.preventDefault()
        const postData = {
            tag : tag,
            token : token
        }
        console.log(serverUrl);
        const token_user = localStorage.getItem('authToken')
        axios.post(`${serverUrl}/api/coc/verifyToken`, postData, {
                headers: {
                'Authorization': `Bearer ${token_user}`
                }
            })
            .then((response) => {
                console.log('Response:', response.data);
                localStorage.setItem('playerTag', response.data.tag);
                navigate('/player')
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
                setWrongTagOrToken(true)
            });
    }


    return (
        <div className="page-container">
            <h1 className='ic1'>Se connecter à clash of clans</h1>
            <form onSubmit={handleSummit} className="formulaire">
                <Tag tag={tag} setTag={setTag} setWrongTagOrToken={setWrongTagOrToken} />
                <Token token={token} setToken={setToken} setWrongTagOrToken={setWrongTagOrToken} />
                <input className="clash-button green-button ic1" type="submit" value="Se connecter" />
                {wrongTagOrToken && <p className='incorrect'>Tag ou token incorrect</p>}
                <p className="ic1">* Vous pouvez trouver votre tag dans sur votre profil sous votre nom</p>
                <p className="ic1">** Vous pouvez générer un token dans : paramètres -{'>'} paramètres supplémentaires -{'>'} Jeton API (en bas de page) -{'>'} Afficher</p>
                <p className="mb">Le token est valide 5 min, à utilisation unique et ne permet en aucun cas de se connecter à votre compte</p>
            </form>
        </div>
    )
}

export default Login