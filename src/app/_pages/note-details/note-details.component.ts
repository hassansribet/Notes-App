import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../_shared/models/note.model';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  note: Note;
  firstTime = true;
  noteForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
    console.log(this.f.title);
  }

  get f(): any {
    return this.noteForm.controls;
  }

  onSubmit(): void {
    this.firstTime = false;
    console.log(this.noteForm, this.f.title);
  }
}
