import Navigation from "../Navigation";
import '../../styles/header.css'

function Header() {
  
  //const token = localStorage.getItem('authToken')
  //let isLogged = token ? true : false
    
  return (
    <header>
        <div className="header">
        <Navigation />
        </div>
    </header>
  );
}

export default Header;