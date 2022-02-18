import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase-config'


const ViewRequests = () => {

    const booksCollectionRef = collection(db, "books")
    const [allbooks, SetAllbooks] = useState([])

    useEffect(() => {
        const getBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            SetAllbooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getBooks()
    }, [])

    const issueBook = async (bookId, requestedBy) => {
        const bookDoc = doc(db, "books", bookId)
        let temp = requestedBy
        const newFields = { issuedTo: temp, requestedBy: "" };
        await updateDoc(bookDoc, newFields)
        const userDoc = doc(db, "users", temp)
        await updateDoc(userDoc, {
            requestedBooks: arrayRemove(bookId),
            issuedBooks: arrayUnion(bookId)
        })
        console.log("issued")
    }

    return (
        <div>
            {allbooks.map(book => (
                book.requestedBy && book.requestedBy.length > 0 ?
                    <div>
                        <p>Titel - {book.title}</p>
                        <p>Requested by - {book.requestedBy}</p>
                        {book.requestedBy.length && book.requestedBy.length > 0 ? <button onClick={() => issueBook(book.id, book.requestedBy)}>Issue book</button> : <button disabled>Already Issued</button>}

                    </div>
                    : null
            ))
            }
        </div>

    )
}

export default ViewRequests