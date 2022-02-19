import React from 'react'
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import './Reg.css'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [uid, setUid] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()

    const usersCollectionRef = collection(db, "users")
    const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setUid(currentUser.uid);
        setEmail(currentUser.email)
    });
    const createUser = async () => {
        await setDoc(doc(db, "users", uid), { uid: uid, name: name, email: email, phone: phone })
        .then(navigate('/books'))
    }
        
    return (
        <div>
            <div>Register</div>
            <div className='reg'>
                <form>
                <input placeholder='name' onChange={e => setName(e.target.value)} />
                <input value={email} disabled />
                <input placeholder='phone' onChange={e => setPhone(e.target.value)} />
            </form>
            </div>
            <div className='sbutton'>
            <button onClick={createUser}>Save</button>
            </div>
        </div>
    )
}

export default Register