import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  inputSelected = false;
  constructor() { }

  ngOnInit(): void {
  }

  focusIn(): void {
    this.inputSelected = true;
    console.log(this.inputSelected);
  }

  focusOut(): void {
    this.inputSelected = false;
    console.log(this.inputSelected);
  }
}
