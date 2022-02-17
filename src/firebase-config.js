import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-yhwuz4JpyIziESIgKFtQqALT7V4-miY",
    authDomain: "dbms-25475.firebaseapp.com",
    projectId: "dbms-25475",
    storageBucket: "dbms-25475.appspot.com",
    messagingSenderId: "841487204712",
    appId: "1:841487204712:web:ba3ef4eb98a75bfc6b96dd",
    measurementId: "G-YVL1H2WC43"
};

const fireApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth, fireApp }

