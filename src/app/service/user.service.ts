import { Injectable } from '@angular/core';
import { collection, onSnapshot } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: any = {};

  constructor(private firestore: Firestore) {} 

  loadUsers() {
    const usersRef = collection(this.firestore, 'users');
    onSnapshot(usersRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.users[doc.id] = doc.data();
      });
    });
  }

  getUserName(userId: string): string {    
    return this.users[userId]?.username || 'Unbekannt';
  }

  getUserPhoto(userId: string): string {
    return this.users[userId]?.photo || 'defaultPhotoLink';
  }
}
