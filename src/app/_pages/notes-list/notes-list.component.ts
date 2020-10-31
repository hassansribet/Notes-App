import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../_shared/services/notes.service';
import { Note } from '../../_shared/models/note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  inputSelected = false;
  notes: Note[] = [];
  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Note;
      });

      console.log(this.notes);
    });
  }

  focusIn(): void {
    this.inputSelected = true;
  }

  focusOut(): void {
    this.inputSelected = false;
  }
}
