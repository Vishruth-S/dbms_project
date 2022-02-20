import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase-config';
import './Landing.css'

const Landing = () => {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return (
        <div className='land-container'>
            <div className='land'>
                <h1>Welcome to Library</h1>
                {/* <div className='landi'>
                <Link  to="/books">View all books</Link>
            </div>
            {!user ?
                <div>
                    <div className='landi'>
                        <Link to="/login?type=user">User Login</Link>
                    </div>
                    <div className='landi'>
                        <Link to="/login?type=admin">Admin Login</Link>
                    </div>
                </div>
                : null
            } */}


            </div>
        </div>
    )
}

export default Landing