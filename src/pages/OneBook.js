import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebase-config';

const OneBook = () => {
    const [id, setId] = useState()
    const [searchParams, setSearchParams] = useSearchParams();
    const [book, setBook] = useState({})

    const booksCollectionRef = collection(db, "books")
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    useEffect(() => {
        setId(searchParams.get("id"))
        const getBook = async () => {
            const data = await getDocs(booksCollectionRef)
            const book = data.docs.filter(e => e.id === id)[0]
            const bookData = book.data()
            setBook(bookData)
        }
        getBook()
        // console.log(bookDoc.data())
    })
    return (
        <div>
            <div>Book details</div>
            <p>Title- {book.title}</p>
            <p>Author- {book.author}</p>
            <p>Genre- {book.genre}</p>
            <p>Available- {book.available}</p>

            {user ? <button>Request</button> : <p>Please sign in to request</p>}
        </div>
    )
}

export default OneBook