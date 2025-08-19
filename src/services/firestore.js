import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD3cSbTV4QBmfo8_iftZBQskAlN_f7q0nw',
  authDomain: 'myplayer-3e303.firebaseapp.com',
  projectId: 'myplayer-3e303',
  messagingSenderId: '438685814787',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const addFavoritePlayer = async (playerData) => {
  const user = auth.currentUser;
  console.log(auth.currentUser);

  if (user) {
    const userId = user.uid;
    const playerId = playerData.id;

    try {
      const favoritesCollectionRef = collection(
        db,
        'users',
        userId,
        'favorites',
        playerId
      );
      await setDoc(favoritesCollectionRef, playerId);
      console.log('선수 정보가 성공적으로 추가되었습니다.');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  } else {
    console.log('No user is logged in.');
  }
};

export { db, addFavoritePlayer };
