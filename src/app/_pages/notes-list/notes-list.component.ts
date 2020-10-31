import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../_shared/services/notes.service';
import { Note } from '../../_shared/models/note.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  loading = false;
  inputSelected = false;
  notes: Note[] = [];

  constructor(
    private router: Router,
    private toast: ToastrService,
    private notesService: NotesService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    if (window.history.state.action !== undefined && window.history.state.result !== undefined) {
      console.log(window.history.state.action, window.history.state.result);
      switch (window.history.state.result) {
        case 'success':
          if (window.history.state.action === 'add') { // add new note
            this.onSuccess('Note added successfully!', 'Add Note');
          } else { // update note
            this.onSuccess('Note updated successfully!', 'Update Note');
          }
          break;
        case 'error':
          this.onError();
          break;
        default:
          // do nothing
          break;
      }
    }

    this.notesService.getNotes().subscribe(data => {
      this.loading = false;
      this.notes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Note;
      });
    }, err => {
      this.onError();
    });
  }

  focusIn(): void {
    this.inputSelected = true;
  }

  focusOut(): void {
    this.inputSelected = false;
  }

  deleteNote(noteId: any): void {
    if (confirm('Are you sure ?')) {
      this.notesService.deleteNote(noteId)
        .then(r => {
          this.onSuccess('Note deleted successfully!', 'Delete Note');
        })
        .catch(err => {
          this.onError();
        });
    }
  }

  onSuccess(message: string, title: string): void {
    this.toast.success(message, title);
  }

  onError(): void {
    this.toast.error('Sorry, try later!', 'Error');
  }
}


