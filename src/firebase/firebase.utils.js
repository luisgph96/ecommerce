import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDbDCRKyPWIvAKll1R8-xnS9ZTz96uw7_o",
    authDomain: "crwn-db-cdc96.firebaseapp.com",
    databaseURL: "https://crwn-db-cdc96.firebaseio.com",
    projectId: "crwn-db-cdc96",
    storageBucket: "crwn-db-cdc96.appspot.com",
    messagingSenderId: "91807630134",
    appId: "1:91807630134:web:6bd549c269b430df3da997",
    measurementId: "G-J1VGKV51TR"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
