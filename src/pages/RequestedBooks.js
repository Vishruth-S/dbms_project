import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { Component, useEffect, useState } from 'react'
import { db, auth } from '../firebase-config';

class RequestedBooks extends Component {
    state = {
        requestedBookIds: [],
        requestedBooks: [],
        temp: true,
        temp2: false,
        user: {}
    }
    componentDidMount() {
        onAuthStateChanged(auth, (currentUser) => {
            this.setState({ user: currentUser })
        });
        this.callme()
    }

    componentDidUpdate(props, prevState) {
        console.log(props, prevState)
        if (prevState.temp && prevState.requestedBookIds.length < 1)
            this.callme()
        if (prevState.temp2) {
            this.setState({ temp2: false })
        }
    }
    callme = async () => {
        const q = (query(collection(db, "users"), where("uid", "==", this.state.user.uid)));
        console.log(q)
        // setTemp(q)
        const querySnapshot = q ? await getDocs(q) : null;
        let temp = []
        querySnapshot.forEach((doc) => {
            temp.push(doc.data());
        });
        // console.log("hello")
        let rqbooks = temp[0].requestedBooks
        this.setState({ requestedBookIds: rqbooks, temp: false, temp2: true })
        if (this.state.temp2)
            this.getBooks()
        // console.log(rqbooks)
        // console.log(requestedBookIds)


    }
    getBooks = async () => {
        console.log("hi")
        this.state.requestedBookIds.map(id => {
            const bookRef = db.collection("books").doc(id);
            bookRef.get().then((doc) => {
                if (doc.exists) {
                    // let t = requestedBooks
                    // t.push(doc.data())
                    let t = [...this.state.requestedBooks, doc.data()]
                    this.setState({ requestedBooks: t })
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        })
    }
    render() {
        return (
            <div>
                <p>RequestedBooks</p>
                {this.state.requestedBooks.map(book => (
                    <div>
                        <p>Title - {book.title}</p>
                    </div>
                ))}
            </div>
        )
    }
}
// function RequestedBooks() {

//     const [requestedBookIds, setRequestedBooksIds] = useState([])
//     const [requestedBooks, setRequestedBooks] = useState([])
//     const [temp, setTemp] = useState(null)

//     const [user, setUser] = useState({});

//     const callme = async () => {
//         console.log(user.uid)
//         const q = (query(collection(db, "users"), where("uid", "==", user.uid)));
//         console.log(q)
//         setTemp(q)
//         // const querySnapshot = q ? await getDocs(q) : null;
//         // let temp = []
//         // querySnapshot.forEach((doc) => {
//         //     temp.push(doc.data());
//         // });
//         // console.log("hello")
//         // let rqbooks = temp[0].requestedBooks
//         // setRequestedBooksIds(rqbooks)
//         // console.log(rqbooks)
//         // console.log(requestedBookIds)
//         // getBooks()
//     }
//     useEffect(() => {

//         const getBooks = async () => {
//             requestedBookIds.map(id => {
//                 const bookRef = db.collection("books").doc(id);
//                 bookRef.get().then((doc) => {
//                     if (doc.exists) {
//                         // let t = requestedBooks
//                         // t.push(doc.data())
//                         setRequestedBooks([...requestedBooks, doc.data()])
//                     }
//                 }).catch((error) => {
//                     console.log("Error getting document:", error);
//                 });
//             })
//         }
//         // callme()
//     }, [])




//     return (



//     )
// }

export default RequestedBooks