import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DisplayBooksInProfile from '../Components/DisplayBooksInProfile';
import DisplayFinesInProfile from '../Components/DisplayFinesInProfile';
import { auth, db } from '../firebase-config';
import './Profile.css';
const Profile = () => {
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({})

    const getData = async () => {
        const currentUser = user.uid ? doc(db, "users", user.uid) : null
        const currentUserData = await getDoc(currentUser);
        setUserData(currentUserData.data())
    }

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    useEffect(() => {
        getData();
    }, [user])
    return (
        <div className='profile'>
            <h2>My Profile</h2>
            <h3>Name: {userData.name}</h3>
            <h4>Library id: {userData.uid}</h4>
            <p>Registered email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            {userData.requestedBooks && userData.requestedBooks.length > 0 ?
                <div>
                    <h3>Requested books</h3>
                    <DisplayBooksInProfile bookIds={userData.requestedBooks} />
                </div>
                : <div><button disabled>View Requested books</button> <span>You have not requested any books yet</span></div>
            }
            {userData.issuedBooks && userData.issuedBooks.length > 0 ?
                <div>
                    <h3>Issued books</h3>
                    <DisplayBooksInProfile bookIds={userData.issuedBooks} />
                </div>
                : <div><button disabled>View Issued books</button> <span>You have not been issued any books yet</span></div>
            }
            {userData.fines && userData.fines.length > 0 ?
                <div>
                    <h3>Fines</h3>
                    <DisplayFinesInProfile fineIds={userData.fines} />
                </div>
                : <div><button disabled>View Fines</button> <span>You don't have any fines</span></div>
            }
        </div>
    )
}

export default Profile