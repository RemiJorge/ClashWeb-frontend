import { useNavigate } from 'react-router-dom'
import im1 from '../../../assets/bg/image1.jpg'
import im2 from '../../../assets/bg/image2.jpg'


function Accueil(){

    const navigate = useNavigate()

    function handleClick(url){
        navigate(url)
    }

    return (
        <div >            
            <h1 className="ic1">Recrutement</h1>
            <div className="container-recrutement-accueil">
                <div className="versjoueurs rac" onClick={() => handleClick('/recruitment/players')}>
                    <div className="supercell-font">
                        <h2>Chercher un Clan</h2>
                    </div>
                    <img className="img-illustration" src={im1} alt="image1" />
                </div>
                <div className="versclans rac" onClick={() => handleClick('/recruitment/clans')}>
                    <div className="supercell-font">
                        <h2>Recruter des joueurs</h2>
                    </div>
                    <img className="img-illustration" src={im2} alt="image2" />
                </div>
            </div>
        </div>
    )
}

export default Accueil