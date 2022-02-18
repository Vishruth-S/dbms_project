import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';

const DisplayBooksInProfile = ({ bookIds }) => {
    const [allbooks, setAllbooks] = useState([])
    const [books, setBooks] = useState([])

    const booksCollectionRef = collection(db, "books")
    // buggy
    const filterBooks = () => {
        setBooks(allbooks.filter(el => (
            el.id in bookIds
        )))
        console.log(books)
    }
    useEffect(() => {
        db.collection('books').onSnapshot(snapshot => (
            setAllbooks(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        ))
        // filterBooks()
    }, [allbooks.length]);
    return (
        <div>
            {allbooks.map(book => (
                <div>
                    {bookIds.includes(book.id) === true ? <p>{book.data.title}</p> : null}
                </div>
            ))}
        </div>
    )
}

export default DisplayBooksInProfile