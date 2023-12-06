import { Component } from '@angular/core';
import { FirestoreUserService } from '../service/firestore-user.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-profilepicture',
  templateUrl: './profilepicture.component.html',
  styleUrls: ['./profilepicture.component.scss']
})
export class ProfilepictureComponent {
  avatars  : string[] = [];
  
  constructor(private firestoreUserService: FirestoreUserService,
    private dialogRef: MatDialogRef<ProfilepictureComponent>){}
  
  ngOnInit(): void {
    const basePath = '../../assets/img/avatar/avatar';
    for(let i = 1; i < 25; i++) {
      this.avatars.push(basePath + i.toString() + '.png')  
    }
  }

  useAvatar(avatar: string) {
    this.firestoreUserService.changePhoto(avatar)
    console.log("Save " + avatar)
    this.closeDialog()
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
