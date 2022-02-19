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
        <div>
            <span>
                <Link to="/">HOME</Link>
                <Link to="/books">View all books</Link>
            </span>
            {user ?
                <span>
                    <span>Logged in as {user.email}</span>
                    <span>
                        <button onClick={logout}>
                            Log out
                        </button>
                    </span>
                    <span>
                        <Link to="/profile">View User Dashboard</Link>
                    </span>
                </span>
                : <a href='/login'>Login</a>}
            {/* <span></span> */}
        </div>
    )
}

export default Navbar