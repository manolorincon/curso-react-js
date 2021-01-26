import firebase from 'firebase/app';
import {} from 'firebase/firestore';
import {} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

/**
     * const firebaseConfig = {
        apiKey: "AIzaSyDZEttHPJJjpq0IC47ZbyukF4yQ84HFm1k",
        authDomain: "react-apps-cursos-7690a.firebaseapp.com",
        projectId: "react-apps-cursos-7690a",
        storageBucket: "react-apps-cursos-7690a.appspot.com",
        messagingSenderId: "435526898803",
        appId: "1:435526898803:web:49c3452beecc68c8cf8606"
    };

    const firebaseConfigTesting = {
        apiKey: "AIzaSyDIBQWTR2N2-Mh1tIKBvlG7lEIkPI6N40c",
        authDomain: "react-app-cursos-test-ea8cc.firebaseapp.com",
        databaseURL: "https://react-app-cursos-test-ea8cc-default-rtdb.firebaseio.com",
        projectId: "react-app-cursos-test-ea8cc",
        storageBucket: "react-app-cursos-test-ea8cc.appspot.com",
        messagingSenderId: "377733911260",
        appId: "1:377733911260:web:e93466090cf8288348da19"
    };
*/


firebase.initializeApp(firebaseConfig);

console.log(firebaseConfig);


//referencia a mi base de datos
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, //bdd
    googleAuthProvider, //proveedor de google
    firebase //firebase
}