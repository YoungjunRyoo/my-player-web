import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signOut, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD3cSbTV4QBmfo8_iftZBQskAlN_f7q0nw',
  authDomain: 'myplayer-3e303.firebaseapp.com',
  projectId: 'myplayer-3e303',
  storageBucket: 'myplayer-3e303.firebasestorage.app',
  messagingSenderId: '438685814787',
  appId: '1:438685814787:web:8139305764d9e0d5a3be36',
  measurementId: 'G-8NLDC1D46W',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log('로그아웃 성공!');
    return true;
  } catch (error) {
    console.error('로그아웃 오류:', error);
    return false;
  }
};

export { db, auth, handleSignOut, provider };
