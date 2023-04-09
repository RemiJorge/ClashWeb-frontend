import {Link} from 'react-router-dom'
//import {useLocation} from 'react-router-dom'

function Navigation(){
    //const location = useLocation();
    return (
        <nav>
        <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/login">Login</Link>
            </li>
            <li>
            <Link to="/signup">Signup</Link>
            </li>
            <li>
            <Link to="/player">Player</Link>
            </li>
            <li>
            <Link to="/ranking">Ranking</Link>
            </li>
            <li>
            <Link to="/settings">Settings</Link>
            </li>
            <li>
            <Link to="/shop">Shop</Link>
            </li>
        </ul>
        </nav>
    )
}

export default Navigation