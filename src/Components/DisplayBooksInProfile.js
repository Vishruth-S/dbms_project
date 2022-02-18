import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';

const DisplayBooksInProfile = ({ bookIds }) => {
    const [books, setBooks] = useState([])
    const getBooks = () => {
        bookIds?.map(id => {
            const bookRef = db.collection("books").doc(id);
            bookRef.get().then((doc) => {
                if (doc.exists) {
                    let t = [...books, doc.data()]
                    setBooks(t)
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        })
    }
    useEffect(() => {
        getBooks()
    }, [])
    return (
        <div>
            {books.map(book => (
                <h3>Title - {book.title}</h3>
            ))}
        </div>
    )
}

export default DisplayBooksInProfile