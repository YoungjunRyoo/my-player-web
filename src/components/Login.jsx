import { useState, useEffect } from 'react';
import '../css/Login.css';
import { app } from '../services/firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useLoginContext } from '../contexts/LoginContext.jsx';

const auth = getAuth(app);

function Login({ close }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { loginSuccess, setLoginTrue, loginUser } = useLoginContext();

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const clickButton = async (e) => {
    e.preventDefault();

    login(id, password);
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('로그인 성공:', userCredential.user);
      setLoginTrue();
      loginUser(userCredential.user);
      close();
    } catch (error) {
      console.error('로그인 실패:', error.message);
      setErrorMsg('Failed to Login: check your email or password');
    }
  };

  return (
    <>
      {errorMsg && <div className="Login-error-banner">{errorMsg}</div>}
      <div className="Login-modal">
        <div className="Login-container">
          {/* <button className="Login-close" onClick={close}>
            &times;
          </button> */}
          <h1 className="Login-header">Login</h1>

          <form className="Login-div">
            <input
              type="text"
              placeholder="Username"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={clickButton}>
              Login
            </button>
          </form>

          <div className="forgetPassword">
            <h5>Forget Password?</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
