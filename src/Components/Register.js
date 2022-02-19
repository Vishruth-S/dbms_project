import React from 'react'
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { Route, Switch, Redirect, Navigate } from "react-router-dom";

const Register = ({ type }) => {
    const [uid, setUid] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState(false)

    // const usersCollectionRef = collection(db, "users")
    const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setUid(currentUser.uid);
        setEmail(currentUser.email)
    });
    const createUser = async () => {
        await setDoc(doc(db, String(type), uid), { uid: uid, name: name, email: email, phone: phone })
        alert("Account created successfully")
        setRedirect(true)
    }
    return (
        <div>
            {!redirect
                ?
                <div>
                    <div>Add your details</div>
                    <div>
                        <input placeholder='name' onChange={e => setName(e.target.value)} />
                        <input value={email} disabled />
                        <input placeholder='phone' onChange={e => setPhone(e.target.value)} />
                    </div>
                    <button onClick={createUser}>Create account</button>
                </div>
                : <Navigate to="/" />
            }
        </div>
    )
}

export default Register