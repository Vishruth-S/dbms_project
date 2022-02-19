import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAj5E3-IrA21bOfbVQXJca9vseLyMKlZ14",
    authDomain: "dbms-3.firebaseapp.com",
    projectId: "dbms-3",
    storageBucket: "dbms-3.appspot.com",
    messagingSenderId: "552213678327",
    appId: "1:552213678327:web:49df098d03f8a5eb416bf2"
};

const fireApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth, fireApp }

