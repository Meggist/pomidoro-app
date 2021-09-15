import {Injectable} from '@angular/core'
import {Book} from "./searchField.service";

@Injectable(
  {providedIn: 'root'})

export class SearchResultService {
  bookCards: Book[] = []

  filterNewBooks = (resultBooks: Book[], addedBook: Book[]) => {
        this.bookCards = resultBooks
          .filter(({ id: id1 }) => !addedBook.some(({ id: id2 }) => id2 === id1))
  }


}
