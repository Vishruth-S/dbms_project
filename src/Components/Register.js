import React from 'react'
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import './Reg.css'
import { Navigate, useNavigate } from 'react-router-dom';
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

    const [state, setState] = useState("loading (4 sec)...");
    useEffect(() => {
        let isMounted = true;
        fetchData();
        return () => {
            isMounted = false;
        };

        // simulate some Web API fetching
        function fetchData() {
            setTimeout(() => {
                // drop "if (isMounted)" to trigger error again 
                // (take IDE, doesn't work with stack snippet)
                if (isMounted) setState("data fetched")
                else;
            }, 4000);
        }
    }, []);

    return (
        <div>
            {!redirect
                ?
                <div>
                    <div className='reg'>
                        <h4>Add your details</h4>
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
                : <Navigate to="/" />
            }
        </div >
    )
}

export default Register