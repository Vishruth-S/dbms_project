import React, { useEffect, useState } from 'react'
import './DisplayBooks.css';

const DisplayBooks = ({ type, allbooks }) => {
    const [allBooks, SetAllbooks] = useState([])
    useEffect(() => {
        SetAllbooks(allbooks)
    }, [allbooks])
    return (
        <div className='displaybooks' >
            <h3>All Available Books</h3>
            <div className='books'>
                {allBooks.map(book => (
                    <div className='card' key={book.id}>
                        {/* <div className='card_content'> */}
                        <p><span>Title :</span> {book.title}</p>
                        <p><span>Author :</span>  {book.author}</p>
                        <p><span>Genre :</span>   {book.genre}</p>
                        {/* <p><span>Image</span> - {book.image}</p> */}
                        <p> <span>Available : </span>  {book.available}</p>
                        {/* </div> */}
                        <a href={`/books/view?id=${book.id}&type=${type}`}>
                            <div className='viewButton'>
                                VIEW
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DisplayBooks