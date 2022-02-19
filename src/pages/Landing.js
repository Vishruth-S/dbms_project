import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <h1>Welcome to Library</h1>
            <div>
                <Link to="/books">View all books</Link>
            </div>
            <div>
                <Link to="/login?type=user">User Login</Link>
            </div>
            <div>
                <Link to="/login?type=admin">Admin Login</Link>
            </div>
        </div>
    )
}

export default Landing