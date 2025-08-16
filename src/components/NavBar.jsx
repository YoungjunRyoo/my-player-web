import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import Login from './LogIn';
import { useLoginContext } from '../contexts/LoginContext.jsx';

function NavBar() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const { loginSuccess, currentUser } = useLoginContext();

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
            {!loginSuccess && (
              <p className="link" onClick={() => clickSignIn()}>
                Sign In
              </p>
            )}
          </div>
          {loginSuccess && <FaRegUserCircle className="user" />}
        </div>
      </div>

      <div>
        {isModalOpen && (
          <>
            <p>{currentUser?.email}</p>
            <Login close={closeModal} />
          </>
        )}
      </div>
    </>
  );
}

export default NavBar;
