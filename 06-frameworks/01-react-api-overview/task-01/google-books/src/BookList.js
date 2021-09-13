import React from 'react'
import BookCard from './BookCard'
const BookList = (props) =>{
    return(
        <div className="list">
            <h1>Search result:</h1>
            {
                props.books.map((book,i)=>{
                    return <BookCard handleAdd={props.handleAdd} 
                        key={i}
                        image={book.volumeInfo.imageLinks.smallThumbnail}
                        title={book.volumeInfo.title}
                        subtitle={book.volumeInfo.subtitle}
                        description={book.volumeInfo.description}
                        date={book.volumeInfo.publishedDate}
                        authors={book.volumeInfo.authors}
      
                    />
                })
            }
        </div>
    )
}
export default BookList