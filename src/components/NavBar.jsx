import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Login from './LogIn.jsx';
import { useLoginContext } from '../contexts/LoginContext.jsx';

function NavBar() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentUser, logout } = useLoginContext();

  const clickSignIn = () => {
    setisModalOpen(true);
  };

  const closeModal = () => {
    setisModalOpen(false);
  };

  const toggleUserMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-menu">
          <Link to="/" className="home-link">
            MyPlayer
          </Link>
          <div className="nav-links">
            <Link to="/" className="link">
              Home
            </Link>
            {currentUser ? (
              <Link to="/favorites" className="link">
                Favorites
              </Link>
            ) : (
              <p className="link" onClick={clickSignIn}>
                Favorites
              </p>
            )}
          </div>
        </div>
        <div className="profile">
          {!currentUser && (
            <p className="link" onClick={() => clickSignIn()}>
              Sign In
            </p>
          )}

          {currentUser && (
            <div className="profile">
              <FaRegUserCircle className="user-icon" onClick={toggleUserMenu} />
            </div>
          )}

          {currentUser && isMenuOpen && (
            <div className="user-dropdown-menu">
              <p>Account Settings</p>
              <p onClick={handleLogout}>Log out</p>
            </div>
          )}
        </div>
      </div>

      <div>
        {isModalOpen && (
          <>
            <Login close={closeModal} />
          </>
        )}
      </div>
    </>
  );
}

export default NavBar;
