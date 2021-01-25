import firebase from 'firebase/app';
import {} from 'firebase/firestore';
import {} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZEttHPJJjpq0IC47ZbyukF4yQ84HFm1k",
    authDomain: "react-apps-cursos-7690a.firebaseapp.com",
    projectId: "react-apps-cursos-7690a",
    storageBucket: "react-apps-cursos-7690a.appspot.com",
    messagingSenderId: "435526898803",
    appId: "1:435526898803:web:49c3452beecc68c8cf8606"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//referencia a mi base de datos
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, //bdd
    googleAuthProvider, //proveedor de google
    firebase //firebase
}