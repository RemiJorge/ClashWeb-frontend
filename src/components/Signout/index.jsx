import {useNavigate} from 'react-router-dom'



function Signout(){
    const navigate = useNavigate()

    function handleSignout(){
        localStorage.removeItem('authToken')
        navigate('/')
    }

    return (
        <div>
            <button onClick={handleSignout}>Se déconnecter</button>
        </div>
    )
}

export default Signout