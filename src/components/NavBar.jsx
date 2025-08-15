import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import Login from './LogIn';

function NavBar() {
  const [isModalOpen, setisModalOpen] = useState(false);

  const clickSignIn = () => {
    setisModalOpen(true);
  };

  const closeModal = () => {
    setisModalOpen(false);
  };

  return (
    <>
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
        <div className="profile">
          <div>
            <p className="link" onClick={() => clickSignIn()}>
              Sign In
            </p>
          </div>
          <FaRegUserCircle className="user" />
        </div>
      </div>
      <div>{isModalOpen && <Login close={closeModal} />}</div>
    </>
  );
}

export default NavBar;
