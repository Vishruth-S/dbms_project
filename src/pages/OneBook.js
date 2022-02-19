import { onAuthStateChanged } from 'firebase/auth';
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebase-config';

const OneBook = () => {
    const [id, setId] = useState()
    const [searchParams, setSearchParams] = useSearchParams();
    const [book, setBook] = useState({})

    const booksCollectionRef = collection(db, "books")
    const usersCollectionRef = collection(db, "users")
    const [user, setUser] = useState({});

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

        getBook()
        // getUserData()
        // console.log(bookDoc.data())
    }, [id])
    return (
        <div>
            <div>Book details</div>
            <p>Title- {book.title}</p>
            <p>Author- {book.author}</p>
            <p>Genre- {book.genre}</p>
            {/* <p>Available- {book.available}</p> */}

            {!user ? <p>Please sign in to request</p> :
                book.available === "yes" ? <button onClick={requestBook}>Request</button> :
                    <button disabled>Unavailable</button>
            }
        </div>
    )
}

export default OneBook