import React, { useEffect, useState } from 'react'
import './DisplayBooks.css';

const DisplayBooks = (props) => {
    const [allBooks, SetAllbooks] = useState([])
    useEffect(() => {
        SetAllbooks(props.allbooks)
    })
    return (
        <div >
            <h3>All books</h3>
            <div className='books'>
            {allBooks.map(book => (
                <div className='card'>
                    {/* <div className='card_content'> */}
                    <p><span>Title :</span> {book.title}</p>
                    <p><span>Author :</span>  {book.author}</p>
                    <p><span>Genre :</span>  - {book.genre}</p>
                    {/* <p><span>Image</span> - {book.image}</p> */}
                    <p> <span>Available </span> - {book.available}</p>
                    {/* </div> */}
                    <a  href={`/books/view?id=${book.id}`}>
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