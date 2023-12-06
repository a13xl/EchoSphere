import { Component, OnDestroy, NgModule } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from '../service/errorStateMatcher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Channel } from '../../models/channel.class';
import {
  Firestore,
  collection,
  collectionData,
  setDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable, Subscription } from 'rxjs';

@NgModule({
  providers: [
    { provide: ErrorStateMatcher, useClass: MyErrorStateMatcher },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
})
export class DialogDeleteChannelModule {}


@Component({
  selector: 'app-dialog-delete-channel',
  templateUrl: './dialog-delete-channel.component.html',
  styleUrls: ['./dialog-delete-channel.component.scss'],
})
export class DialogDeleteChannelComponent {
  formControl = new FormControl('', [Validators.required]);
  channelTypeControl = new FormControl('public');
  channel: Channel = new Channel(); // brauch ich das hier, wohl eher nicht
  loading: boolean = false;
  matcher = new MyErrorStateMatcher();
  channelId: string = '';
  errorMessage: string = '';

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { channelId: string },
    private firestore: Firestore
  ) {}

  async deleteChannel() {
    const channelRef = doc(this.firestore, 'channels', this.data.channelId);
    await deleteDoc(channelRef).then(() => {
      this.router.navigate(['/chat']);
    });
  }
}



