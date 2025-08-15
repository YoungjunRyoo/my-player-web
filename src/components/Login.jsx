import { useState } from 'react';
import '../css/Login.css';
import { app } from '../services/firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('로그인 성공:', userCredential.user);
  } catch (error) {
    console.error('로그인 실패:', error.message);
  }
};

login('user@example.com', 'password123');

function Login({ close }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="Login-modal" onClick={close}>
        <div className="Login-container">
          {/* <button className="Login-close" onClick={close}>
            &times;
          </button> */}
          <h1 className="Login-header">Login</h1>
          <form className="Login-div">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
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
