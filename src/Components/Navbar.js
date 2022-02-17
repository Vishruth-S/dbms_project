import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase-config';

const Navbar = () => {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    const logout = async () => {
        await signOut(auth);
    };
    return (
        <div>
            {user ? <span><span>Logged in as {user.email}</span><span><button onClick={logout}>Log out</button></span></span> : <a href='/login'>Login</a>}
            {/* <span></span> */}
        </div>
    )
}

export default Navbar