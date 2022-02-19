import React from 'react'
import { Link } from 'react-router-dom'

const AdminLanding = () => {
    return (
        <div>
            <h2>Welcome Admin</h2>
            <Link to="/viewrequests">View book requests</Link>
            <Link to="/issuedbooks">View issued Books</Link>
            <Link to="/users">View user details</Link>
            <Link to="/addbooks">Add a new book</Link>
            <Link to="/fines">Manage Fines</Link>
        </div>
    )
}

export default AdminLanding