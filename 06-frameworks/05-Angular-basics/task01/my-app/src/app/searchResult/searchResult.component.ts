import {Component, OnInit} from '@angular/core'
import {SearchResultService} from "../searchResult.service";
import {MyListService} from "../myList.service";
import {Book} from "../searchField.service";

@Component({
  templateUrl: './searchResult.component.html',
  selector: 'searchResult',
  styleUrls: ['./searchResult.component.css']
})

export class SearchResultComponent {
  constructor(public searchResultService: SearchResultService,
              public myListService: MyListService) {
  }

  addBook = (book: Book) => {
    this.myListService.addBook(book)
    this.searchResultService.bookCards = this.searchResultService.bookCards
      .filter(item => item.id !== book.id)
  }
}
