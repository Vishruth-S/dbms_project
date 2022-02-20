import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DisplayBooksInProfile from '../Components/DisplayBooksInProfile';
import DisplayFinesInProfile from '../Components/DisplayFinesInProfile';
import { auth, db } from '../firebase-config';
import './Profile.css';
import profile from './Pic.jpg';
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
        <div >
        <div className='profile'>
            <h2>Profile</h2>
            <img src={profile}></img>
            <p>Name: <span>{userData.name}</span></p>
            <p>Library id: <span>{userData.uid}</span></p>
            <p>Registered email: <span>{userData.email}</span></p>
            <p>Phone: <span>{userData.phone}</span></p>
        </div>
        <div className='table'>
            <div className='trow'>
            <h3>Requested books</h3>
            {userData.requestedBooks && userData.requestedBooks.length > 0 ?
                <div>
                    
                    <DisplayBooksInProfile bookIds={userData.requestedBooks} />
                </div>
                : <div>
                    {/* <button disabled>View Requested books</button> */}
                    <span>NO BOOK REQUESTED</span></div>
            }
            </div>
            <div className='trow'>
            <h3>Issued books</h3>
            {userData.issuedBooks && userData.issuedBooks.length > 0 ?
                <div>
                    
                    <DisplayBooksInProfile bookIds={userData.issuedBooks} />
                </div>
                : <div>
                    {/* <button disabled>View Issued books</button> */}
                    <span>NO BOOKS ISSUED</span></div>
            }
            
            </div>
            <div className='trow'>
            <h3>Fines</h3>
            {userData.fines && userData.fines.length > 0 ?
                <div>
                    
                    <DisplayFinesInProfile fineIds={userData.fines} />
                </div>
                : <div>
                    {/* <button disabled>View Fines</button>  */}
                    <span>NO FINES</span></div>
            }
            </div>
            </div>
        </div>
    )
}

export default Profile