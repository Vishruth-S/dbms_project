import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase-config';
import './BookIssue.css'

const ViewIssuedBooks = () => {
    const [allbooks, setAllbooks] = useState([])
    useEffect(() => {
        db.collection('books').onSnapshot(snapshot => (
            setAllbooks(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        ))

    }, [allbooks.length]);

    const renewBook = async (bookId, userId) => {
        // Book.issuedTo = ""
        // update available as yes
        // user.issuedBooks remove
        const bookDoc = doc(db, "books", bookId)
        const newFields = { issuedTo: "", available: "yes" };
        await updateDoc(bookDoc, newFields)
        const userDoc = doc(db, "users", userId)
        await updateDoc(userDoc, {
            issuedBooks: arrayRemove(bookId),
        })
        alert("Book marked as returned")
        window.location.reload();
    }

    return (
        <div>
            <h2>IssuedBooks</h2>
            <div className='cardflex'>
                {allbooks.map(book => (
                    <span key={book.id}>
                        {
                            book.data.issuedTo && book.data.issuedTo.length > 0
                                ?
                                <div className='card' key={book.id}> <div>
                                    <p>Title : {book.data.title}</p>
                                    <p>Book id: {book.id}</p>
                                    <p>issued to : {book.data.issuedTo}</p>
                                    <button onClick={() => renewBook(book.id, book.data.issuedTo)}>Mark as returned</button>
                                </div>
                                </div>
                                : null
                        }
                    </span>
                ))}
            </div>
        </div>
    )
}

export default ViewIssuedBooks