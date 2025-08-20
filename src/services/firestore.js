import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';
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

  if (user) {
    const userId = user.uid;
    const playerId = String(playerData.id);

    try {
      const playerDocRef  = doc(
        db,
        'users',
        userId,
        'favorites',
        playerId
      );
      await setDoc(playerDocRef , playerData);
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

  if(user){
    const userId = user.uid;

    try{
       const favoritesColRef = collection(db, "users", userId, "favorites");
  const favoritesSnapshot = await getDocs(favoritesColRef);

  const playerList = favoritesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return playerList;

    }catch (e) {
      console.error('Error reading document: ', e);
    }

  }
  else{
    console.log('No user is logged in.');
  } 
}


export { db, addFavoritePlayer, getFavoritePlayers };
