import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../service/authentication.service';
import { ChatService } from '../service/chat.service';
import { AppComponent } from '../app.component';
import { InfoUserComponent } from '../info-user/info-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-dialog-show-user',
  templateUrl: './dialog-show-user.component.html',
  styleUrls: ['./dialog-show-user.component.scss']
})
export class DialogShowUserComponent {

  currentUserId: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: any },
    private dialogRef: MatDialogRef<DialogShowUserComponent>,
      private authentication: AuthenticationService,
      private chatService: ChatService,
      private dialog: MatDialog,) {

    this.currentUserId = this.authentication.getUserId();
  }

  openChat(puid: string) {
    if(this.currentUserId) {
      this.chatService.openChat(this.currentUserId, puid);
      this.dialogRef.close();
    } else {
      console.log('ERROR: No User logged in!');
    }
  }

  openEdit(uid: string) {
    if(this.currentUserId) {
      this.dialog.open(DialogEditUserComponent, {
        data: {currentUserId: this.currentUserId},
      });
      /* this.dialog.open(InfoUserComponent, {
        height: '50%',
        width: '40%',
      }); */

      //this.appComponent.setStatus();
      this.dialogRef.close();
    } else {
      console.log('ERROR: No User logged in!');
    }
  }
}
