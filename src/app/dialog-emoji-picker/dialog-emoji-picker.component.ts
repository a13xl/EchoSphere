import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {
  addDoc,
  getDoc,
  collection,
  doc,
  updateDoc,
  Firestore,
  getFirestore,
} from 'firebase/firestore';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-dialog-emoji-picker',
  templateUrl: './dialog-emoji-picker.component.html',
  styleUrls: ['./dialog-emoji-picker.component.scss'],
})
export class DialogEmojiPickerComponent {
  private firestore: Firestore;
  userId: string = this.authentication.getUserId();
  constructor(
    public dialogRef: MatDialogRef<DialogEmojiPickerComponent>,
    public authentication: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: { postId: string }
  ) {
    this.firestore = getFirestore();
  }

  async onEmojiClick(event: any) {
    try {
      console.log(event.detail);
      console.log(this.data.postId);
      const emoji = event.detail.unicode;

      const reactionsCollection = collection(this.firestore, 'reactions');
      const reactionDocRef = await addDoc(reactionsCollection, {
        emoji: emoji,
        userId: this.userId,
      });
      //TODO: delete console log
      console.log(`New reaction created with ID: ${reactionDocRef.id}`);

      const postDoc = doc(this.firestore, 'posts', this.data.postId);
      const postDocSnap = await getDoc(postDoc);

      if (postDocSnap.exists()) {
        const postData = postDocSnap.data();
        postData['reaction'].push(reactionDocRef.id);
        await updateDoc(postDoc, { reaction: postData['reaction'] });
        console.log('Post updated with new reaction ID');
        this.dialogRef.close();
      }
    } catch (error) {
      console.error('Error adding new reaction: ', error);
    }
  }
}
