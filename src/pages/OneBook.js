import { onAuthStateChanged } from 'firebase/auth';
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { Navigate, useNavigate } from 'react-router-dom';
import './OneBook.css'

const OneBook = () => {
    const [id, setId] = useState()
    const [searchParams, setSearchParams] = useSearchParams();
    const [book, setBook] = useState({})
    const [type, setType] = useState('')

    const booksCollectionRef = collection(db, "books")
    const usersCollectionRef = collection(db, "users")
    const [user, setUser] = useState({});

    const navigate = useNavigate()

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });



    const requestBook = async () => {
        // change available to No
        // add requestedBy to book

        const bookDoc = doc(db, "books", id)
        const newFields = { available: "no", requestedBy: user.uid };
        await updateDoc(bookDoc, newFields)

        // add book to UserRequests
        await updateUserData()

        alert("request placed successfully")
        window.location.reload();
        //     const newFields = { age: age + 1 };
        //     await updateDoc(userDoc, newFields)

        // // add to requestes of admin table
    }

    const deleteBook = async (bookid) => {
        if (book.fine) {
            alert("This book has a fine associated with it. Resolve that before deletion")
            return;
        }
        // remove from shelf
        const shelfDoc = doc(db, "shelves", book.shelf)
        await updateDoc(shelfDoc, {
            books: arrayRemove(bookid)
        })
        const bookDoc = doc(db, "books", bookid);
        await deleteDoc(bookDoc).then(() => {
            alert("Deleted successfully")
            navigate('/books')
        })
    }

    const updateUserData = async () => {
        const data = await getDocs(usersCollectionRef)
        const temp = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        const currentUserData = temp.filter(e => e.uid === user.uid)[0]
        const userDoc = doc(db, "users", currentUserData.id)

        await updateDoc(userDoc, {
            requestedBooks: arrayUnion(id)
        })
    }


    const getBook = async () => {
        const bookRef = db.collection("books").doc(id);
        bookRef.get().then((doc) => {
            if (doc.exists) {
                setBook(doc.data());
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    useEffect(() => {
        setId(searchParams.get("id"))
        setType(searchParams.get("type"))
        getBook()
        // getUserData()
        // console.log(bookDoc.data())
    }, [id])
    return (
        <div className='onebook'>
            <h1>Book details</h1>
            <div className='entireCard'>
                <div className='cover'>
                    <img src={book.img == null ? "https://images-na.ssl-images-amazon.com/images/I/81Hf9W0uoxL.jpg" : book.img} />
                </div>
                <div class="right">
                    <p>Title: <span>{book.title}</span></p>
                    <p>Author: <span>{book.author}</span></p>
                    <p>Genre: <span>{book.genre}</span></p>
                    {/* <p>Available- {book.available}</p> */}
                    {user && type === "admin" ?
                        <div className='onebook'>
                            <p>Book id <span>{id}</span></p>
                            <p>Price: <span>{book.price}</span></p>
                            <p>ISBN: <span>{book.isbn}</span></p>
                            <p>Issued to: <span>{book.issuedTo && book.issuedTo.length > 0 ? book.issuedTo : <span>Not issued</span>}</span></p>
                        </div>
                        :
                        null}
                    {!user ? <p>Please sign in to request</p> :
                        type === "admin" ?
                            book.issuedTo && book.issuedTo.length > 0 ? <button disabled>Issued book cannot be deleted</button> : <button onClick={() => deleteBook(id)}>Delete</button>
                            : book.available === "yes" ? <button onClick={requestBook}>Request</button>
                                :
                                <button disabled>Unavailable</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default OneBook