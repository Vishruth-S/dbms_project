import React from 'react'
import { Link } from 'react-router-dom'
import './AdminLanding.css'

const AdminLanding = () => {
    return (
        <div>
            <h2>Welcome Admin</h2>
            <Link className='landlink' to="/viewrequests">View book requests</Link>
            <Link className='landlink'to="/issuedbooks">View issued Books</Link>
            <Link className='landlink'to="/users">View user details</Link>
            <Link className='landlink'to="/addbooks">Add a new book</Link>
            <Link className='landlink'to="/fines">Manage Fines</Link>
        </div>
    )
}

export default AdminLanding