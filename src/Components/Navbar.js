import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase-config';
import './Navbar.css'

const Navbar = () => {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    const logout = async () => {
        await signOut(auth);
    };
    return (
        <div className='navbar'>
            <h1>LMS</h1>
            {user ? <span ><span className='nav'>Logged in as: {user.email}</span><span className='nav'><button className='button' onClick={logout}>Log out</button></span></span> : <a  href='/login'>
                <button className='button'>
                Login
                </button>
                </a>}
            {/* <span></span> */}
        </div>
    )
}

export default Navbar