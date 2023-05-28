import { useNavigate } from 'react-router-dom'

function Navigation(){
    //verify if the user is connected
    //if yes, display the navigation
    //if no, display the navigation without the player, ranking, settings and shop links
    const navigate = useNavigate()
    const token = localStorage.getItem('authToken')
    const isModo = localStorage.getItem('isModo') === 'true'
    let currentPage = window.location.pathname
    let isLogged = token ? true : false

    function handleSignout(){
        localStorage.removeItem('authToken')
        localStorage.removeItem('playerTag')
        localStorage.removeItem('isModo')
        localStorage.removeItem('isAdmin')
        isLogged = false
        navigate('/')
    }

    function handleClick(dir){
        navigate(dir)
        
    }

    return (
        <nav className="navigation">
        <ul>
            {!isLogged && <li onClick={() => handleClick("/")}   className={currentPage==="/" ? "selection page-actuelle": "selection"}><p>Accueil</p></li> }
            {isLogged && <li onClick={() => handleClick("/player")} className={currentPage==="/player" ? "selection page-actuelle": "selection"}><p>Joueur</p></li>}
            {isLogged && <li onClick={() => handleClick("/recruitment")} className={currentPage.startsWith("/recruitment") ? "selection page-actuelle": "selection"}><p>Recrutement</p></li>}
            {isLogged && isModo && <li onClick={() => handleClick("/manage")} className={currentPage==="/manage" ? "selection page-actuelle": "selection"}><p>Modération</p></li>}
            {isLogged && <li onClick={() => handleClick("/settings")} className={currentPage==="/settings" ? "selection page-actuelle": "selection"}><p>Paramètres</p></li>}
            {isLogged && <button className="clash-button green-button" onClick={handleSignout}>Se déconnecter</button>}
            {!isLogged && <li onClick={() => handleClick("/signup")} className={currentPage==="/signup" ? "selection page-actuelle": "selection"}><p>Inscription</p></li>}
            {!isLogged && <li onClick={() => handleClick("/login")} className={currentPage==="/login" ? "selection page-actuelle": "selection"}><p>Connection</p></li>}
        </ul>
        </nav>
    )
}

export default Navigation