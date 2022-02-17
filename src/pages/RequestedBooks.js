import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebase-config';

function RequestedBooks() {

    const [requestedBookIds, setRequestedBooksIds] = useState([])
    const [requestedBooks, setRequestedBooks] = useState([])


    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        // callme()
    });

    useEffect(() => {
        const callme = async () => {
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            console.log(q)
            const querySnapshot = await getDocs(q);
            let temp = []
            querySnapshot.forEach((doc) => {
                temp.push(doc.data());
            });
            setRequestedBooksIds(temp[0].requestedBooks ? temp[0].requestedBooks : [])
        }
        const getBooks = async () => {
            requestedBookIds.map(id => {
                const bookRef = db.collection("books").doc(id);
                bookRef.get().then((doc) => {
                    if (doc.exists) {
                        // let t = requestedBooks
                        // t.push(doc.data())
                        setRequestedBooks([...requestedBooks, doc.data()])
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            })
        }
        callme()
        getBooks()
    }, [requestedBookIds.length])




    return (
        <div>
            <p>RequestedBooks</p>
            {requestedBooks.map(book => (
                <div>
                    <p>Title - {book.title}</p>
                </div>
            ))}
            {/* <button onClick={callme}>ok</button> */}
            {/* <button onClick={getBooks}>ok</button> */}
        </div>


    )
}

export default RequestedBooks