import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../_shared/services/notes.service';
import { Note } from '../../_shared/models/note.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  inputSelected = false;
  notes: Note[] = [];

  constructor(
    private router: Router,
    private notesService: NotesService,
  ) { }

  ngOnInit(): void {
    console.log(new Date());
    if (window.history.state.action !== undefined && window.history.state.result !== undefined) {
      console.log(window.history.state.action, window.history.state.result);
    }

    this.notesService.getNotes().subscribe(data => {
      this.notes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Note;
      });
    });
  }

  focusIn(): void {
    this.inputSelected = true;
  }

  focusOut(): void {
    this.inputSelected = false;
  }

  deleteNote(noteId: any): void {
    this.notesService.deleteNote(noteId);
  }
}


