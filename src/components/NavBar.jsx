import { Link } from 'react-router-dom';
import '../css/NavBar.css';

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-menu">
        <Link to="/" className="link">
          {/* <p className="link">My player</p> */}
          MyPlayer
          {/* <img src="/images/logo.png" alt="Logo" /> */}
        </Link>
        <div className="nav-links">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/favorites" className="link">
            Favorites
          </Link>
        </div>
      </div>
      <div>
        <p className="link">Log In</p>
      </div>
    </div>
  );
}

export default NavBar;
