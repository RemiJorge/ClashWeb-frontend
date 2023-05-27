import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Tag from './components/Tag'
import Token from './components/Token'

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Login() {
    const [tag, setTag] = useState('')
    const [token, setToken] = useState('')
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
            });
    }


    return (
        <div>
            <h1>Se connecter à clash of clans</h1>
            <form onSubmit={handleSummit}>
                <Tag tag={tag} setTag={setTag} />
                <Token token={token} setToken={setToken} />
                <input type="submit" value="Se connecter" />
            </form>
        </div>
    )
}

export default Login