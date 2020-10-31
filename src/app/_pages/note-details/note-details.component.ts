import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../_shared/models/note.model';
import { Router } from '@angular/router';
import { NotesService } from '../../_shared/services/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  action = '';
  note: Note;
  firstTime = true;
  loading = false;
  noteForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private notesService: NotesService,
  ) { }

  ngOnInit(): void {
    if (window.history.state.action !== undefined && window.history.state.note !== undefined) {
      this.action = window.history.state.action;
      this.note = window.history.state.note;

      this.noteForm = this.formBuilder.group({
        title: [this.note.title, Validators.required],
        description: [this.note.description]
      });
    } else {
      this.action = 'add';
      this.note = {
        id: '',
        title: '',
        description: ''
      };

      this.noteForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['']
      });
    }
  }

  get f(): any {
    return this.noteForm.controls;
  }

  onSubmit(): void {
    if (this.firstTime) {
      this.firstTime = false; // to hide the error message when the page is loaded
    }

    this.loading = true;
    if (this.noteForm.valid) {
      switch (this.action) {
        case 'add':
          this.addNote();
          break;
        case 'update':
          this.updateNote();
          break;
      }
    }
  }

  onClickCancel(): void {
    this.router.navigate(
      ['/'], {
        state: {
          action: this.action,
          result: 'canceled'
        }
      });
  }

  addNote(): void {
    this.notesService.addNote({
      title: this.noteForm.value.title,
      description: this.noteForm.value.description,
      createdAt: new Date().toString()
    })
      .then(r => {
        this.loading = false;
        this.router.navigate(
          ['/'], {
            state: {
              action: this.action,
              result: 'success'
            }
          });
      })
      .catch(err => {
        this.router.navigate(
          ['/'], {
            state: {
              action: this.action,
              result: 'error'
            }
          });
      });
  }

  updateNote(): void {
    this.notesService.updateNote({
      id: this.note.id,
      title: this.noteForm.value.title,
      description: this.noteForm.value.description,
    })
      .then(r => {
        this.loading = false;
        this.router.navigate(
          ['/'], {
            state: {
              action: this.action,
              result: 'success'
            }
          });
      })
      .catch(err => {
        console.log(err.message);
        this.router.navigate(
          ['/'], {
            state: {
              action: this.action,
              result: 'error'
            }
          });
      });
  }
}
