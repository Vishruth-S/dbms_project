import { useEffect, useState } from 'react';
import { db } from '../../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, arrayUnion, setDoc } from "firebase/firestore"
// import DisplayBooks from '../Components/DisplayBooks';

function AddBook() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [price, setPrice] = useState('')
    const [publisher, SetPublisher] = useState('')
    const [isbn, setIsbn] = useState('')
    const [allbooks, SetAllbooks] = useState([])
    const [allShelves, setAllShelves] = useState([])
    const [shelf, setShelf] = useState('')
    const [bookdocId, setBookdocId] = useState('')
    const [temp, setTemp] = useState(0);

    const booksCollectionRef = collection(db, "books")
    const shelvesCollectionRef = collection(db, "shelves")

    const createBook = async () => {
        const bookObj = {
            title: title,
            author: author,
            genre: genre,
            available: "yes",
            publisher: publisher,
            price: price,
            isbn: isbn,
            shelf: shelf
        }
        const bookdocId = doc(collection(db, "books"));
        // console.log(bookdocId.id)
        setBookdocId(bookdocId.id)
        await setDoc(bookdocId, bookObj)
        setTemp(temp ^ 1);
        updateBooksOnShelf()
    }

    const updateBooksOnShelf = async () => {
        if (bookdocId == '') return;
        const shelfDoc = doc(db, "shelves", shelf)
        // console.log(shelfDoc)
        await updateDoc(shelfDoc, {
            books: arrayUnion(bookdocId)
        })
    }
    // const updateUser = async (id) => {
    //     const userDoc = doc(db, "books", id)
    //     const newFields = { age: age + 1 };
    //     await updateDoc(userDoc, newFields)
    // }

    const getShelves = async () => {
        const data = await getDocs(shelvesCollectionRef)
        setAllShelves(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const deleteUser = async (id) => {
        const bookDoc = doc(db, "books", id);
        await deleteDoc(bookDoc)
    }

    useEffect(() => {
        const getBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            SetAllbooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getBooks()
        getShelves()
        updateBooksOnShelf()
    }, [temp])

    const getSelectedValue = (e) => {
        // console.log(e.target.value)
        setShelf(e.target.value)
        console.log(shelf)
    }

    return (
        <div className="App">
            <div>
                <h2>Add book</h2>
                <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
                <input placeholder="Author" onChange={e => setAuthor(e.target.value)} />
                <input placeholder="Genre" onChange={e => setGenre(e.target.value)} />
                <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
                <input placeholder="Publisher" onChange={e => SetPublisher(e.target.value)} />
                <input placeholder="ISBN" onChange={e => setIsbn(e.target.value)} />
                <label>Choose a shelf</label>
                <select defaultValue="select" onChange={e => getSelectedValue(e)}>
                    <option disabled value="select">select</option>
                    {allShelves.map(shelf => (
                        <option key={shelf.id} value={shelf.id}>{shelf.code}</option>
                    ))}
                </select>
                <button onClick={createBook}>Add book</button>
            </div>
            {/* <DisplayBooks allbooks={allbooks} /> */}
        </div>
    );
}

export default AddBook;
