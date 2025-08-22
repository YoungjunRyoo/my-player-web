import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db, auth } from './firebase';

const addFavoritePlayer = async (playerData) => {
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;
    const playerId = String(playerData.id);

    try {
      const playerDocRef = doc(db, 'users', userId, 'favorites', playerId);
      await setDoc(playerDocRef, playerData);
      console.log('선수 정보가 성공적으로 추가되었습니다.');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  } else {
    console.log('No user is logged in.');
  }
};

async function getFavoritePlayers() {
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;

    try {
      const favoritesColRef = collection(db, 'users', userId, 'favorites');
      const favoritesSnapshot = await getDocs(favoritesColRef);

      const playerList = favoritesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return playerList;
    } catch (e) {
      console.error('Error reading document: ', e);
    }
  } else {
    console.log('No user is logged in.');
  }
}

async function deleteFavoritePlayer(id) {
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;
    try {
      await deleteDoc(doc(db, 'users', userId, 'favorites', String(id)));
    } catch (e) {
      console.error('Error deleting document', e);
    }
  }
}

export { db, addFavoritePlayer, getFavoritePlayers, deleteFavoritePlayer };
