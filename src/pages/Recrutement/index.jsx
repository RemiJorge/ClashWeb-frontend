import { useNavigate } from 'react-router-dom'
import { Routes, Route} from 'react-router-dom'
import Players from './components/Players'
import Clans from './components/Clans'
import Accueil from './components/Accueil'
import "./styles/annonce.css"

function Recrutement(){
    
    const navigate = useNavigate()
    const currentPage = window.location.pathname

    function handleClick(dir){
        navigate(dir)
    }

    //affiche tous les utilisateurs recupérés dans la base de données
    return (
        <div className="page-container">
            <div className="selection-container">
                <div className={currentPage === "/recruitment/players" ?  "clash-selection current-selection" : "clash-selection"} 
                    onClick = {() => handleClick("/recruitment/players")}> 
                    Joueur cherche Clan</div>
                <div className={currentPage === "/recruitment/clans" ?  "clash-selection current-selection" : "clash-selection"} 
                    onClick = {() => handleClick("/recruitment/clans")}> 
                    Clan cherche Joueurs</div>
            </div>

            <Routes>
                <Route path="/" element={<Accueil/>}/>
                <Route path="players" element={<Players/>}/>
                <Route path="clans" element={<Clans/>}/>
            </Routes>


        </div>
    )
}

export default Recrutement