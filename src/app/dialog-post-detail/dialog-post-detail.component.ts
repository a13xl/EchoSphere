import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Firestore,
  collection,
  collectionData,
  setDoc,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { FirestoreUserService } from '../service/firestore-user.service'; 
import { DialogService } from '../service/dialog.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-dialog-post-detail',
  templateUrl: './dialog-post-detail.component.html',
  styleUrls: ['./dialog-post-detail.component.scss'],
})
export class DialogPostDetailComponent {
  public post: any;
  public replies: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogPostDetailComponent>,
    private firestore: Firestore,
    private userService: FirestoreUserService,
    private dialogService: DialogService,
    private userNameService: UserService
  ) {
    console.log('postId:', data.postId);
    console.log('postData:', data.postData);
    this.post = data.postData;
    console.log('this.post:', this.post);
    console.log('this.post.message:', this.post.message);
    console.log('this.post.replay:', this.post.replay);
    this.getReplies();
    this.dialogService.closeDialogObservable.subscribe(() => {
      this.closeDialog();
    });
  }
  ngOnInit() {
    this.userNameService.loadUsers();
  }

  // async getReplies() {
  //   for (let replyId of this.post.replay) {
  //     console.log('Getting reply with ID:', replyId);
  //     let docRef = doc(this.firestore, 'replys', replyId);
  //     let docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       console.log('Found reply:', docSnap.data());
  //       let replyData = docSnap.data();
  //       if (replyData && replyData['timestamp']) {
  //         replyData['timestamp'] = new Date(replyData['timestamp']);
  //         this.replies.push(replyData);
  //       }
  //     } else {
  //       console.log('No reply found with ID:', replyId);
  //     }
  //   }
  //   console.log('Replies:', this.replies);
  // }

  async getReplies() {
    this.replies = []; // Zurücksetzen der Array vor dem Laden neuer Daten
    for (let replyId of this.post.replay) {
      console.log('Getting reply with ID:', replyId);
      let docRef = doc(this.firestore, 'replys', replyId);
      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Found reply:', docSnap.data());
        let replyData = docSnap.data();
        if (replyData && replyData['timestamp']) {
          replyData['timestamp'] = new Date(replyData['timestamp']);

          // Benutzerdetails laden und an Antwortdaten anhängen
          const userId = replyData['user_id'];
          const user = await this.userService.getUser(userId);
          if (user) {
            replyData['username'] = user.username;
            replyData['userImage'] = user.photo;
          }
          // else {
          //   replyData['username'] = 'Unbekannt';
          //   replyData['userImage'] = '';
          // }

          this.replies.push(replyData);
        }
      } else {
        console.log('No reply found with ID:', replyId);
      }
    }
    console.log('Replies:', this.replies);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getUserName(userId: string): string {
    return this.userNameService.getUserName(userId);
  }

  getOtherUserPhoto(userID: string): string {
    return this.userNameService.getUserPhoto(userID);
  }
}
