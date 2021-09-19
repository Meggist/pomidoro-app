import React from 'react'
import MyBookCard from './MyBookCard'
const MyList = (props) =>{
    return(
        <div className="list" >
            <h1>My List:</h1>
            {
                props.myBooks.map((book,i)=>{
                    return <MyBookCard handleRemove={props.handleRemove}
                        key={i}
                        image={book.image}
                        title={book.title}
                        subtitle={book.subtitle}
                        description={book.description}
                        date={book.date}
                        authors={book.authors}
      
                    />
                })
            }
        </div>
    )
}
export default MyList