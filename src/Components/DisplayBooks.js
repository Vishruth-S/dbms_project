import React, { useEffect, useState } from 'react'

const DisplayBooks = (props) => {
    console.log(props)
    const [allBooks, SetAllbooks] = useState([])
    useEffect(() => {
        SetAllbooks(props.allbooks)
    })
    return (
        <div>
            <h3>All books</h3>
            {allBooks.map(book => (
                <div>
                    <p>Title - {book.title}</p>
                    <p>Author - {book.author}</p>
                    <p>Genre - {book.genre}</p>
                    <p>Image - {book.image}</p>
                    <p>Available - {book.available}</p>
                    <a href={`/books/view?id=${book.id}`}>View</a>
                </div>
            ))}
        </div>
    )
}

export default DisplayBooks