import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Login from './LogIn.jsx';
import { useLoginContext } from '../contexts/LoginContext.jsx';
import { handleSignOut } from '../services/firebase.js';
import { auth } from '../services/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

function NavBar() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up
  }, []);

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
    await handleSignOut();
    setIsMenuOpen(false);
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
            {user ? (
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
          {!user && (
            <p className="link" onClick={() => clickSignIn()}>
              Sign In
            </p>
          )}

          {user && (
            <div className="profile">
              <FaRegUserCircle className="user-icon" onClick={toggleUserMenu} />
            </div>
          )}

          {user && isMenuOpen && (
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
