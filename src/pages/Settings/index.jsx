import { Link } from 'react-router-dom'

function Settings(){
    return (
        <div>
            <h1>Settings</h1>
            <Link to="/changepassword">Changer de mot de passe</Link>
        </div>
    )
}

export default Settings