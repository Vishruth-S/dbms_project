import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';

const DisplayFinesInProfile = ({ fineIds }) => {
    const [fines, setFines] = useState([])
    useEffect(() => {
        db.collection('fines').onSnapshot(snapshot => (
            setFines(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        ))
        // filterBooks()
    }, [fines.length]);
    return (
        <div>
            {fines.map(fine => (
                <div key={fine.id}>
                    {fineIds.includes(fine.id)
                        ?
                        <div>
                            <p>Book id - {fine.data.book}</p>
                            <p>Amount - {fine.data.amount}</p>
                            <p>Due date - {fine.data.due}</p>
                        </div>
                        : null
                    }
                </div>
            ))}
        </div>
    )
}

export default DisplayFinesInProfile