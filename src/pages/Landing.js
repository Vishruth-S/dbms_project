import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase-config';

const Landing = () => {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return (
        <div>
            <h1>Welcome to Library</h1>
            <div>
                <Link to="/books">View all books</Link>
            </div>
            {!user ?
                <div>
                    <div>
                        <Link to="/login?type=user">User Login</Link>
                    </div>
                    <div>
                        <Link to="/login?type=admin">Admin Login</Link>
                    </div>
                </div>
                : null
            }


        </div>
    )
}

export default Landing