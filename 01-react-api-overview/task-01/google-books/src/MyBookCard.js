import React from 'react'
const MyBookCard = (props) =>{
    return(
        <div className="card-container">
            <img src={props.image} alt=""/>
            <div className="desc">
                <h2 className = 'title'>{props.title}</h2>
                <h3 className = 'subtitle'>{props.subtitle}</h3>
                <h3 className = 'description'>{props.description}</h3>
                <h3 className = 'authours'>{props.authors}</h3>
                <p className = 'date'>{props.date}</p>
                <button type="sumbit" onClick={props.handleRemove}>Remove</button>
            </div>

        </div>
    )
}
export default MyBookCard   