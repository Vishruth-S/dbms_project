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
        const currentUser = user?.uid ? doc(db, "admins", user.uid) : null
        if (user && user.uid) {
            const currentUserData = await getDoc(currentUser);
            // console.log(currentUserData.data())
            setAdmin(currentUserData.data()?.uid)
        }
    }
    useEffect(() => {
        getAdmins()
    }, [user])

    return (
        <div className='navbar'>
            <span className='nav'>
                <span className='nav-links'>
                    {user && user?.uid === admin
                        ? <Link to="/adminlanding">Admin Dashboard</Link>
                        : <Link to="/">HOME</Link>
                    }
                </span>
                <span className='nav-links' >
                    {user && user?.uid === admin
                        ? <Link to="/viewbooks">BOOKS</Link>
                        : <Link to="/books">BOOKS</Link>
                    }
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
                        {user && user.uid === admin ? null :
                            <Link to="/profile">View User Dashboard</Link>
                        }
                    </span>
                    <span className='nav-links'>
                        <button onClick={logout}>
                            Log out
                        </button>
                    </span>
                </span>
                :
                <div className='lognav'>
                    {/* <a href='/login'>User</a>
                <a href='/login?type=admin'>Admin</a> */}
                    <span>
                        <Link to="/login?type=user">USER</Link>
                    </span>
                    <span>
                        <Link to="/login?type=admin">ADMIN</Link>
                    </span>
                </div>
            }
            {/* <span></span> */}
        </div>
    )
}

export default Navbar