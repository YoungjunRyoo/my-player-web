import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useState, useContext, useEffect } from 'react';
import { app } from '../services/firebase';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인됨
        setLoginSuccess(true);
        setCurrentUser(user);
        console.log("Context: 사용자가 로그인 상태입니다.", user.uid);
      } else {
        // 사용자가 로그아웃됨
        setLoginSuccess(false);
        setCurrentUser(null);
        console.log("Context: 사용자가 로그아웃 상태입니다.");
      }
    });

    // 컴포넌트 언마운트 시 리스너 해제
    return () => unsubscribe();
  }, []);
  
  const setLoginTrue = () => {
    setLoginSuccess(true);
  };

  const setLoginFalse = () => {
    setLoginSuccess(false);
  };

  const loginUser = (prop) => {
    setCurrentUser(prop);
  };

  // const value = { loginSuccess, setLoginTrue, setLoginFalse };

  return (
    <LoginContext.Provider
      value={{
        loginSuccess,
        setLoginTrue,
        setLoginFalse,
        currentUser,
        loginUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
