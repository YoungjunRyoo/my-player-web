import { createContext, useState, useContext, useEffect } from 'react';
import { addFavoritePlayer } from '../services/firestore';
import { getFavoritePlayers } from '../services/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  const fetchFavorites = async () => {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchFavorites();
      } else {
        setFavoritePlayers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addPlayer = (prop) => {
    addFavoritePlayer(prop);
    fetchFavorites();
  };

  return (
    <LoginContext.Provider
      value={{
        favoritePlayers,
        addPlayer,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
