import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
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
            <span className='nav'>
                <span className='nav-links'>
                    <Link to="/">HOME</Link>
                </span>
                <span className='nav-links' >
                    <Link to="/books">Books</Link>
                </span>
            </span>
            {/* <span className='nav'>
                <Link to="/">HOME</Link>
                <Link to="/books">Books</Link>
            </span> */}
            
            {user ?
                <span className='nav'>
                    {/* <span>Logged in as {user.email}</span> */}
                    <span className='nav-links'>
                        <Link to="/profile">User Dashboard</Link>
                    </span>
                    <span className='nav-links'>
                        <button onClick={logout}>
                            Log out
                        </button>
                    </span>
                </span>
                : <a href='/login'>Login</a>}
            {/* <span></span> */}
        </div>
    )
}

export default Navbar