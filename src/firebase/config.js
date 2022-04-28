import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics'



const firebaseConfig = {
    apiKey: "AIzaSyBL1HPdHb4g8lBF_9ElTWFiRNLhyiUa3LI",
    authDomain: "todo-app-9a3b8.firebaseapp.com",
    projectId: "todo-app-9a3b8",
    storageBucket: "todo-app-9a3b8.appspot.com",
    messagingSenderId: "775018056929",
    appId: "1:775018056929:web:d96313301d51ecc8a67ba0",
    measurementId: "G-VWZ1ZGJY12"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth =firebase.auth();
  const db = firebase.firestore();

  export {auth,db};
  export default firebase;