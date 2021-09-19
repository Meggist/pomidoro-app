import React from 'react'
const BookCard = (props) =>{
    return(
        <div className="card-container">
            <img src={props.image} alt=""/>
            <div className="desc">
                <h2 className = 'title'>{props.title}</h2>
                <h3 className = 'subtitle'>{props.subtitle}</h3>
                <h3 className = 'description'>{props.description}</h3>
                <h3 className = 'authours'>{props.authors}</h3>
                <p className = 'date'>{props.date}</p>
                <button onClick= {props.handleAdd} type="sumbit">Add</button>
            </div>

        </div>
    )
}
export default BookCard