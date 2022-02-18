import React, { useEffect, useState } from 'react'
import { db } from '../../firebase-config';

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
    return (
        <div>
            <h2>IssuedBooks</h2>
            {allbooks.map(book => (
                <div>
                    {book.data.issuedTo && book.data.issuedTo.length > 0
                        ? <div>
                            <p>{book.data.title}</p>
                            <p>issued to - {book.data.issuedTo}</p>
                        </div>
                        : null}
                </div>
            ))}
        </div>
    )
}

export default ViewIssuedBooks