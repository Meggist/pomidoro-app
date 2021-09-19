import { Component, OnInit } from '@angular/core'
import {SearchResultService} from "../searchResult.service";
import {MyListService} from "../myList.service"
import {Book} from "../searchField.service";

@Component({
  templateUrl: './myList.component.html',
  selector: 'myList',
  styleUrls: ['./myList.component.css']
})

export class MyListComponent implements OnInit{
  ngOnInit(): void {
    this.getMyBooks()
  }

  constructor(public searchResultService: SearchResultService,
              public myListService: MyListService) {
  }

  getMyBooks = () => {
    this.myListService.getMyBooks()
  }

  removeBook = (book: Book) => {
    this.searchResultService.bookCards.unshift(book)
    this.myListService.removeBook(book.id)
  }
}
