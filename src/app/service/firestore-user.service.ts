import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, limit,
   orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUserService {
  user = new User();

  constructor(private firestore: Firestore, private authentication: AuthenticationService) { }

  addUser(userId: any) {
    const avatarNr = Math.floor(Math.random() * 24)+1;
    this.user.guest = false;
    this.user.photo = `assets/img/avatar/avatar${avatarNr}.png`;
    
    const collectionInstance = collection(this.firestore, 'users');
    const documentRef = doc(collectionInstance, userId);
    setDoc(documentRef, this.user.toJSON()).then((result: any) => {})
    .catch((error: any) => {
      console.error('User add ERROR:', error);
    });
  }

  async changeUsername(input: string) {
    const userId = await this.authentication.getUserId();
    const docRef = doc(this.firestore, 'users', `${userId}`);

    await updateDoc(docRef, {username: input})
      .then((e) => { })
      .catch((err) => {
        console.log('Error while changing Username', err);
    });
  }


  async changeEmail(newEmail: string) {
    const userId = await this.authentication.getUserId();
    const docRef = doc(this.firestore, 'users', `${userId}`);

    try {
      await updateDoc(docRef, {email: newEmail});
      return true;
    } catch (error) {
      
      return false;
    }

    /* await updateDoc(docRef, {email: newEmail})
      .then((e) => { })
      .catch((err) => {
        console.log('Error while changing Username', err);
    }); */
  }

  async changePhoto(newPhotoUrl: string) {
    const userId = await this.authentication.getUserId();
    const docRef = doc(this.firestore, 'users', `${userId}`);

    await updateDoc(docRef, {photo: newPhotoUrl})
      .then((e) => { })
      .catch((err) => {
        console.log('Error while changing Username', err);
    });
  }

  async getAllUsers() {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, orderBy('username'));
  
      const snapshot = await getDocs(q);
  
      const users: any = [];
  
      snapshot.forEach((doc) => {
  
        const userData = doc.data();
        const userId = doc.id;

        users.push({ id: userId, ...userData });
      });
  
      return users;
    } catch (error) {
      console.log('Error retrieving users:', error);
      return [];
    }
  }


  async getUser(uid: string): Promise<any> {
    const docRef = doc(this.firestore, 'users', `${uid}`);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('User not exist');
      return null;
    }
  }

}
