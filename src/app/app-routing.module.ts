import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './_pages/main/main.component';
import { NotesListComponent } from './_pages/notes-list/notes-list.component';
import { NoteDetailsComponent } from './_pages/note-details/note-details.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children : [
      { path: '', component: NotesListComponent },
      { path: 'note', component: NoteDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
