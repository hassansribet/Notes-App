import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './_pages/main/main.component';
import { NavBarComponent } from './_layouts/nav-bar/nav-bar.component';
import { NotesListComponent } from './_pages/notes-list/notes-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    NotesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
