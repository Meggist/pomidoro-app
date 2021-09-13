import React from "react";
import { Component } from 'react';
import SearchArea from "./SearchArea";
import request from "superagent"
import BookList from "./BookList";
import MyList from "./MyList";
class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchField: '',
            myBooks: []
        }

        if(JSON.parse(localStorage.getItem("myBooks"))){
            const storedBooks = JSON.parse(localStorage.getItem("myBooks"))          
            this.setState({myBooks: storedBooks})
            this.state.myBooks = storedBooks
}
    }

getItemContent = target => {
    return {
        image: target.parentElement.parentElement.querySelector('img').src,
        title:target.parentElement.querySelector('.title').textContent,
        authors:target.parentElement.querySelector('.authours').textContent,
        date:target.parentElement.querySelector('.date').textContent,
        description: target.parentElement.querySelector('.description').textContent,
        subtitle: target.parentElement.querySelector('.subtitle').textContent
    }
}

    handleRemove = event => {
        event.preventDefault()
        let bookCollection = JSON.parse(localStorage.getItem('myBooks'))
        const activeItem = this.getItemContent(event.target)
        localStorage.removeItem('myBooks')
        if (bookCollection.length !== 1) {
            bookCollection = bookCollection.filter(item => item.title !== activeItem.title)
            localStorage.setItem('myBooks', JSON.stringify(bookCollection))
        } 
        if(JSON.parse(localStorage.getItem("myBooks"))){
            const storedBooks = bookCollection         
            this.setState({myBooks: storedBooks})
            this.state.myBooks = storedBooks
        } else {
            const storedBooks = [] 
            this.setState({myBooks: storedBooks})
            this.state.myBooks = storedBooks
            }

        this.removeAddButton(this.checkIfItemExist())
        this.addAddButton(activeItem)
    }

    searchBook = (e) => {
        e.preventDefault()
        request
            .get('https://www.googleapis.com/books/v1/volumes')
            .query({ q: this.state.searchField })
            .then(data => {
                this.setState({ books: [...data.body.items] })
                if (JSON.parse(localStorage.getItem("myBooks"))) {
                    const storedBooks = JSON.parse(localStorage.getItem("myBooks"))
                    this.setState({ myBooks: storedBooks })
                    this.state.myBooks = storedBooks
                }
                this.removeAddButton(this.checkIfItemExist())
            })

    }

    addAddButton = (book)=>{
        if(book){
            const list = document.querySelector('.list')
            const elements = list.querySelectorAll('.card-container')
            elements.forEach(item =>{
                if(item.querySelector('.title').textContent === book.title
                    && item.querySelector('.description').textContent === book.description ){
                        item.querySelector('button').style.display = 'block'
                    }
            })
        }
    }

    
    handleAdd = event=>{
        event.preventDefault()
        const item = this.getItemContent(event.target)
        if(JSON.parse(localStorage.getItem("myBooks"))){
            const storedBooks = JSON.parse(localStorage.getItem("myBooks"))
            storedBooks.push(item)
            this.setState({myBooks: storedBooks})
            this.state.myBooks = storedBooks
            localStorage.setItem("myBooks", JSON.stringify(this.state.myBooks));
            console.log(JSON.parse(localStorage.getItem("myBooks")))
            event.target.style.display = 'none'
        }else{
            this.state.myBooks.push(item)
            localStorage.setItem("myBooks", JSON.stringify(this.state.myBooks));
            const storedBooks = JSON.parse(localStorage.getItem("myBooks"))
            this.setState({myBooks: storedBooks})
            this.state.myBooks = storedBooks
            event.target.style.display = 'none'
        }
    }
    checkIfItemExist = () =>{
        if(JSON.parse(localStorage.getItem("myBooks"))){
            const savedItems = JSON.parse(localStorage.getItem("myBooks"))
            const list = document.querySelector('.list')
            const elements = list.querySelectorAll('.card-container')
            const displayedItems = []
            elements.forEach(div =>{
                const item = this.getItemContent(div)
                displayedItems.push(item)
            })            
            let sameElements = []
            savedItems.forEach((item1) =>{
                displayedItems.forEach((item2) =>{
                    if(item1.title === item2.title){
                        sameElements.push(item1)
                    }
                })
            })
            return sameElements
        }
    }
    removeAddButton = (array) =>{
        
        if(array !== [] &&  array !== undefined ){
            const list = document.querySelector('.list')
            const elements = list.querySelectorAll('.card-container')
            array.forEach(book =>{
                elements.forEach(item =>{
                    if(item.querySelector('.title').textContent === book.title
                    && item.querySelector('.description').textContent === book.description ){
                            item.querySelector('button').style.display = 'none'
                    } else{
                        item.querySelector('button').style.display = 'block'
                    }
                })
            }) 
        } else{
            const list = document.querySelector('.list')
            const elements = list.querySelectorAll('.card-container')
            elements.forEach(item =>{
                item.querySelector('button').style.display = 'block'
            })
        }
    }
    handleSearch = (e) => {
        this.setState({ searchField: e.target.value })
    }
    render() {
        return (
            <div className="body">
                <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch}/>
                <div className="main">
                    <BookList handleAdd={this.handleAdd} books={this.state.books}/>
                    <MyList myBooks={this.state.myBooks} handleRemove={this.handleRemove}/>
                </div>
            </div>
            );
    }
}

export default Books;