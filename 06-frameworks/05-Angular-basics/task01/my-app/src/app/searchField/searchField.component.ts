import {Component, OnInit} from '@angular/core'
import {FormControl} from "@angular/forms";
import {SearchFieldService} from "../searchField.service";
import {SearchResultService} from "../searchResult.service";
import {MyListService} from "../myList.service";

@Component({
  templateUrl: './searchField.component.html',
  selector: 'searchField'
})

export class SearchFieldComponent implements OnInit {
  request = new FormControl('')


  constructor(private searchFieldService: SearchFieldService,
              private searchResultService: SearchResultService,
              private myListService: MyListService) {
  }


  async search(event: Event) {
    event.preventDefault()
    const books = await this.searchFieldService.search(this.request.value).toPromise()
    const addedBooks = this.myListService.myBooks
    this.searchResultService.filterNewBooks(books, addedBooks)
    this.request.setValue('')
  }

  ngOnInit(): void {
    this.getMyBooks()
  }

  getMyBooks(): void {
    this.myListService.getMyBooks()
    // .subscribe(books => this.myListService.myBooks = books);
  }

}
