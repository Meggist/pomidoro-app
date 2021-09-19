import {Injectable, OnInit} from '@angular/core'
import {Book} from "./searchField.service";
import {Observable} from "rxjs";

@Injectable(
  {providedIn: 'root'})

export class MyListService implements OnInit {
  myBooks: Book[] = []

  addBook = (book: Book) => {
    this.myBooks.push(book)
    localStorage.removeItem('myBooks')
    localStorage.setItem('myBooks', JSON.stringify(this.myBooks))
  }

  removeBook = (id: string) => {
    if (this.myBooks.length === 1) {
      this.myBooks = []
      this.updateLocalStorage()
      return
    }
    this.myBooks = this.myBooks.filter(item => item.id !== id)
    this.updateLocalStorage()
  }

  getMyBooks(): void {
    this.myBooks = Object.values<Book>
    (JSON.parse(<string>localStorage.getItem("myBooks")) ?? [])
  }

  ngOnInit(): void {
    this.getMyBooks()
  }

  updateLocalStorage = () => {
    localStorage.removeItem('myBooks')
    if (!this.myBooks.length) {
      localStorage.setItem('myBooks', JSON.stringify(this.myBooks))
    }
  }
}
