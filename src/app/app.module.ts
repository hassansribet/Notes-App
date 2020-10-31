import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './_pages/main/main.component';
import { NavBarComponent } from './_layouts/nav-bar/nav-bar.component';
import { NotesListComponent } from './_pages/notes-list/notes-list.component';
import { NoteCardComponent } from './_components/note-card/note-card.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    NotesListComponent,
    NoteCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
