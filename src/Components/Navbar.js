import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import './Navbar.css'

const Navbar = () => {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    const logout = async () => {
        await signOut(auth);
    };
    const [admin, setAdmin] = useState({})

    const getAdmins = async () => {
        const currentUser = user.uid ? doc(db, "admins", user.uid) : null
        const currentUserData = await getDoc(currentUser);
        // console.log(currentUserData.data())
        setAdmin(currentUserData.data().uid)
    }
    useEffect(() => {
        getAdmins()
    }, [user])

    return (
        <div>
            <div>
                <span>
                    {user && user.uid === admin
                        ? <Link to="/adminlanding">Go to Admin Dashboard</Link>
                        : <Link to="/">HOME</Link>}
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
                            {user && user.uid === admin ? null :
                                <Link to="/profile">View User Dashboard</Link>
                            }
                        </span>
                    </span>
                    : <a href='/login'>Login</a>}
            </div>
        </div>
    )
}

export default Navbar