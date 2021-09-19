import {NgModule, Pipe, PipeTransform} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SearchResultComponent} from "./searchResult/searchResult.component";
import {SearchFieldComponent} from "./searchField/searchField.component";
import {MyListComponent} from "./myList/myList.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FilterBookDescriptionPipe} from "./filterBookData.pipe";

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    SearchFieldComponent,
    MyListComponent,
    FilterBookDescriptionPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
