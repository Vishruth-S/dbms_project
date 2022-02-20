import { useEffect, useState } from 'react';
import { db } from '../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import DisplayBooks from '../Components/DisplayBooks';
import './Book.css'

const Books = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [available, SetAvailable] = useState(false)
    const [allbooks, SetAllbooks] = useState([])
    const booksCollectionRef = collection(db, "books")

    const [filteredBooks, setFilteredBooks] = useState([])
    const [search, setSearch] = useState('')

    const createBook = async () => {
        await addDoc(booksCollectionRef, { title: title, author: author, genre: genre, available: available })
            .then(
                alert("Added successfully"),
            )
    }

    // const updateUser = async (id) => {
    //     const userDoc = doc(db, "books", id)
    //     const newFields = { age: age + 1 };
    //     await updateDoc(userDoc, newFields)
    // }

    const deleteUser = async (id) => {
        const bookDoc = doc(db, "books", id);
        await deleteDoc(bookDoc)
    }

    const filter = (e) => {
        setSearch(e.target.value)
        const temp = allbooks.filter(book => book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase()))
        setFilteredBooks(temp)
        console.log(temp)
    }

    useEffect(() => {
        const getBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            SetAllbooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getBooks()
        // async () => {
        //     const data = await getDocs(booksCollectionRef)
        //     SetAllbooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // })
    }, [])

    return (
        <div className="">
            {/* <div className='add'>
                <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
                <input placeholder="Author" onChange={e => setAuthor(e.target.value)} />
                <input placeholder="Genre" onChange={e => setGenre(e.target.value)} />
                <input placeholder="Available" onChange={e => SetAvailable(e.target.value)} />
                <button onClick={createBook}>Add book</button>
            </div> */}
            <div className='search-container'>
                <input placeholder='Search by title or author' onChange={e => filter(e)} />
            </div>
            <DisplayBooks allbooks={search !== '' ? filteredBooks : allbooks} />
        </div>
    );
}

export default Books;
