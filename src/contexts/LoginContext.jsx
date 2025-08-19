import { createContext, useState, useContext, useEffect } from 'react';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
