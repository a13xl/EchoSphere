import { Component, OnDestroy, NgModule } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from '../service/errorStateMatcher.service';
import { FormControl, Validators } from '@angular/forms';
import { Channel } from '../../models/channel.class';
import { Firestore, collection, getDoc } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Subscription } from 'rxjs';

@NgModule({
  providers: [{ provide: ErrorStateMatcher, useClass: MyErrorStateMatcher }],
})
export class DialogAddChannelModule {}

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss'],
})
export class DialogAddChannelComponent implements OnDestroy {
  formControl = new FormControl('', [Validators.required]);
  channelTypeControl = new FormControl('public');
  channel: Channel = new Channel();
  loading: boolean = false;
  matcher = new MyErrorStateMatcher();

  private subscriptions: Subscription[] = [];

  constructor(private firestore: Firestore) {
    this.subscriptions.push(
      this.formControl.valueChanges.subscribe((value) => {
        if (value !== null) {
          this.channel.channelName = value;
          console.log('channelName value changed:', value);
        }
      })
    );

    this.subscriptions.push(
      this.channelTypeControl.valueChanges.subscribe((value) => {
        if (value !== null) {
          this.channel.channelType = value;
          console.log('channelType value changed:', value);
        }
      })
    );
  }

  saveChannel() {
    this.loading = true;
    const usersCollection = collection(this.firestore, 'channels');
    addDoc(usersCollection, this.channel.toJson()).then(async (result) => {
      const docSnap = await getDoc(result);
      this.loading = false;
    });
  }

  // unsubscribe from all observables to avoid memory leaks
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
