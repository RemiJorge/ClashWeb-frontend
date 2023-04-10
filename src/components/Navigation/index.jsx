import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../../styles/navigation.css'

function Navigation(){
    //verify if the user is connected
    //if yes, display the navigation
    //if no, display the navigation without the player, ranking, settings and shop links
    const navigate = useNavigate()
    const token = localStorage.getItem('authToken')
    const isLogged = token ? true : false
    function handleSignout(){
        localStorage.removeItem('authToken')
        navigate('/')
    }

    return (
        <nav>
        <ul>
            <li><Link to="/">Accueil</Link></li>
            {isLogged && <li><Link to="/player">Joueur</Link></li>}
            {isLogged && <li><Link to="/ranking">Classement</Link></li>}
            {isLogged && <li><Link to="/settings">Paramètres</Link></li>}
            {isLogged && <li><Link to="/shop">Boutique</Link></li>}
            {isLogged && <button onClick={handleSignout}>Se déconnecter</button>}
            {!isLogged && <li><Link to="/signup">S'inscrire</Link></li>}
            {!isLogged && <li><Link to="/login">Se connecter</Link></li>}
        </ul>
        </nav>
    )
}

export default Navigation