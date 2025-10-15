import { createContext, useState, useContext, useEffect } from 'react';
import {
  addFavoritePlayer,
  getFavoritePlayers,
  deleteFavoritePlayer,
} from '../services/firestore';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, provider, handleSignOut } from '../services/firebase';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  const fetchFavorites = async () => {
    if (!currentUser) return;
    try {
      const players = await getFavoritePlayers();

      if (players) {
        setFavoritePlayers(players);
      } else {
        setFavoritePlayers([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error('Google login error:', e);
    }
  };

  const logout = async () => {
    const result = await handleSignOut();
    if (result) setFavoritePlayers([]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchFavorites();
      } else {
        setFavoritePlayers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addPlayerInFavorites = (prop) => {
    addFavoritePlayer(prop);
    fetchFavorites();
  };

  const deletePlayerInFavorites = (id) => {
    deleteFavoritePlayer(id);
    fetchFavorites();
  };

  return (
    <LoginContext.Provider
      value={{
        currentUser,
        favoritePlayers,
        loginWithGoogle,
        logout,
        addPlayerInFavorites,
        deletePlayerInFavorites,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
