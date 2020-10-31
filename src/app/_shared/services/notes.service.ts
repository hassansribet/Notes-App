import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesCollectionName = 'notes';

  constructor(
    private firestore: AngularFirestore
  ) { }

  getNotes(): any {
    return this.firestore.collection(this.notesCollectionName, ref => ref.orderBy('createdAt', 'desc')).snapshotChanges();
  }

  addNote(note: Note): Promise<any> {
    return this.firestore.collection(this.notesCollectionName).add(note);
  }

  updateNote(note: Note): Promise<any> {
    return this.firestore.doc(this.notesCollectionName + '/' + note.id).update(note);
  }

  deleteNote(id: string): Promise<any> {
    return this.firestore.doc(this.notesCollectionName + '/' + id).delete();
  }
}
