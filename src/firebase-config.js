import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAMiC_OdAp21FI_1L4KGIBwscdDgRdva1k",
    authDomain: "dbms-2-d4938.firebaseapp.com",
    projectId: "dbms-2-d4938",
    storageBucket: "dbms-2-d4938.appspot.com",
    messagingSenderId: "781355699933",
    appId: "1:781355699933:web:1f863a292a6a2b72965534"
};

const fireApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth, fireApp }

