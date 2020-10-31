import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Note} from '../../_shared/models/note.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  @Input() note: Note;

  @Output() clickDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() saveNote: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;
  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;

  live = false;
  constructor(
    private router: Router,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const style = window.getComputedStyle(this.bodyText.nativeElement, null);
    const viewableHeight = parseInt(style.height, 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onDeleteNote(): void {
    this.clickDelete.emit(this.note.id);
  }

  /**
   *
   * @param action: add or update
   * navigate to noteDetails page for add or update a note
   */
  goToNote(action: string, noteP?: Note): any {
    let note: Note = new Note();
    switch (action) {
      case 'add':
        note = {
          id: '',
          title: '',
          description: ''
        };
        break;
      case 'update':
        note = noteP;
        break;
    }

    this.router.navigate(
      ['note/'],
      {
        state: {
          action,
          note
        }
      }).then();
  }

}
