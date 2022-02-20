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
    return (
        <div>
            <h2>IssuedBooks</h2>
            <div className='cardflex'>
                {allbooks.map(book => (
                    <div className='card'>
                        {book.data.issuedTo && book.data.issuedTo.length > 0
                            ? <div>
                                <p>Titel : {book.data.title}</p>
                                <p>issued to : {book.data.issuedTo}</p>
                            </div>
                            : null}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewIssuedBooks