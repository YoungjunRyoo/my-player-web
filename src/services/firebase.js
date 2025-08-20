import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3cSbTV4QBmfo8_iftZBQskAlN_f7q0nw',
  authDomain: 'myplayer-3e303.firebaseapp.com',
  // The value of `databaseURL` depends on the location of the database
  projectId: 'myplayer-3e303',
  // The value of `storageBucket` depends on when you provisioned your default bucket (learn more)
  // storageBucket: "myplayer-3e303.firebasestorage.app",
  messagingSenderId: '438685814787',
  // appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  // measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

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

export { db, auth, handleSignOut };
