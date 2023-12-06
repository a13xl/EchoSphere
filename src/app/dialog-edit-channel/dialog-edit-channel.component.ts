
import { Component, OnDestroy, NgModule, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from '../service/errorStateMatcher.service';
import { FormControl, Validators } from '@angular/forms';
import { Channel } from '../../models/channel.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { onSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-edit-channel',
  templateUrl: './dialog-edit-channel.component.html',
  styleUrls: ['./dialog-edit-channel.component.scss'],
})
export class DialogEditChannelComponent {
  formControl = new FormControl('', [Validators.required]);
  channelTypeControl = new FormControl('public');
  channel: Channel = new Channel();
  loading: boolean = false;
  matcher = new MyErrorStateMatcher();
  channelId: string = '';
  private unsubscribe!: () => void;
  errorMessage: string = '';

  private subscriptions: Subscription[] = [];

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { channelId: string },
    private firestore: Firestore 
  ) {}

  ngOnInit() {
    this.getChannel();
  }

  getChannel() {
    this.channelId = this.data.channelId;
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    const docRef = doc(this.firestore, 'channels', this.channelId);
    this.unsubscribe = onSnapshot(docRef, (docSnap) => {
      this.channel = new Channel(docSnap.data());
      console.log(this.channel);
      this.formControl.setValue(this.channel.channelName);
      this.channelTypeControl.setValue(this.channel.channelType);
    });
  }

  saveChannel() {
    if (this.formControl.value) {
      this.loading = true;
      const channelDoc = doc(this.firestore, 'channels', this.channelId);
      this.channel.channelName = this.formControl.value;
      this.channel.channelType = this.channelTypeControl.value;
//TODO Console log delete
      console.log('saveChannel', this.data.channelId);
      console.log(this.channel.channelName);
      updateDoc(channelDoc, this.channel.toJson())
        .then(() => {
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = 'An error has occurred, try again later';
        });
    }
  }
}
