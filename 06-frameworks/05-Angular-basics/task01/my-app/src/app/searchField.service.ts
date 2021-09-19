import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type Book = {
  id: string,
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publishedDate: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
    };
  };
}

@Injectable(
  { providedIn: 'root' })

export class SearchFieldService {
  private path = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  search(query: string): Observable<Book[]> {
    return this.http
      .get<{ items: Book[] }>(`${this.path}?q=${query}`)
      .pipe(map(books => books.items || []))
  }
}
