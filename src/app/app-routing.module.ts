import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './_pages/main/main.component';
import { NotesListComponent } from './_pages/notes-list/notes-list.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children : [
      { path: '', component: NotesListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
