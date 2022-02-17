import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC-yhwuz4JpyIziESIgKFtQqALT7V4-miY",
    authDomain: "dbms-25475.firebaseapp.com",
    projectId: "dbms-25475",
    storageBucket: "dbms-25475.appspot.com",
    messagingSenderId: "841487204712",
    appId: "1:841487204712:web:ba3ef4eb98a75bfc6b96dd",
    measurementId: "G-YVL1H2WC43"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);
