import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesCollectionName = 'notes';

  constructor(
    private firestore: AngularFirestore
  ) { }

  getNotes(): any {
    return this.firestore.collection(this.notesCollectionName).snapshotChanges();
  }
}
