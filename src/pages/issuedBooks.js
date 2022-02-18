import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { Component, useEffect, useState } from 'react'
import { db, auth } from '../firebase-config';

class IssuedBooks extends Component {
    state = {
        issuedBookIds: [],
        issuedBooks: [],
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
        // console.log(props, prevState)
        if (prevState.temp && prevState.requestedBookIds.length < 1)
            this.callme()
        if (prevState.temp2) {
            this.setState({ temp2: false })
        }
    }
    callme = async () => {
        const q = this.state.user.uid ? (query(collection(db, "users"), where("uid", "==", this.state.user.uid))) : null;
        console.log(q)
        // setTemp(q)
        const querySnapshot = q ? await getDocs(q) : null;
        let temp = []
        querySnapshot?.forEach((doc) => {
            temp.push(doc.data());
        });
        // console.log("hello")
        let rqbooks = temp[0].issuedBooks
        this.setState({ issuedBookIds: rqbooks, temp: false, temp2: true })
        if (this.state.temp2)
            this.getBooks()
        // console.log(rqbooks)
        // console.log(requestedBookIds)


    }
    getBooks = async () => {
        console.log("hi")
        this.state.issuedBookIds.map(id => {
            const bookRef = db.collection("books").doc(id);
            bookRef.get().then((doc) => {
                if (doc.exists) {
                    // let t = requestedBooks
                    // t.push(doc.data())
                    let t = [...this.state.issuedBooks, doc.data()]
                    this.setState({ issuedBooks: t })
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        })
    }
    render() {
        return (
            <div>
                <p>issuedBooks</p>
                {this.state.issuedBooks.map(book => (
                    <div>
                        <p>Title - {book.title}</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default IssuedBooks