import { Link } from "react-router-dom";
import "../css/NavBar.css";
function NavBar(){
    return(
        <div className="navbar">
            <Link to="/" className="logo">
                <img src="/images/logo.png" alt="Logo" />    
            </Link>
            <div className="nav-links">
                <Link to="/" className="home-link">Home</Link>
                <Link to="/favorites" className="favorites-link">Favorites</Link>
            </div>
            
        </div>
    );
}

export default NavBar;