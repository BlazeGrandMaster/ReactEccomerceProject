import { initializeApp } from 'firebase/app';
// Allows to use firebase authentication
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider,

} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnozsDQ9kzjRbVsAN-deZlXt0VzMLvGW8",
  authDomain: "ecommerce-project-db-a8f9e.firebaseapp.com",
  projectId: "ecommerce-project-db-a8f9e",
  storageBucket: "ecommerce-project-db-a8f9e.appspot.com",
  messagingSenderId: "111268685103",
  appId: "1:111268685103:web:595ff5d87bde5ec00eadda"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ 
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log('Error creating user', error.message)
    }
  }

  return userDocRef;
};

// if user data does not exisis



// return userDocRef

export default firebaseApp;