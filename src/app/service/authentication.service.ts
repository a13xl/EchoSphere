import { EventEmitter, Injectable, Output } from '@angular/core';
import { EmailAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, 
  reauthenticateWithCredential, signOut, sendEmailVerification, sendPasswordResetEmail, 
  signInWithEmailAndPassword, updateEmail, updatePassword, updateProfile, User} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  errorMsg = null;
  @Output() isLogout = new EventEmitter<void>();
  user: User | null = null;

  constructor() { }

  async sigup(email: string, password: string): Promise<string | null> {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      this.user = userCredential.user;

      console.log(this.user);
      
      this.emailVerification();
      return this.user.uid;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error during sign up:', errorMessage);
      return null;
    }
  }

  async signin(email: string, password: string) {
    this.errorMsg = null;
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        //console.log('user signed in:', this.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.errorMsg = error;
      });
  }

  async signout() {
    const auth = getAuth();
    await signOut(auth);
  }

  async subAuthState():Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const uid = user.uid;
        } // else User is signed out

        resolve();
      });
    });
  }

  async checkAuthUser(): Promise<boolean> {
    await this.subAuthState();

    /* const auth = getAuth();
    const user = auth.currentUser; */
    
    if (this.user) {
      //console.log('User', user);
      
      // User is signed in.
      return true;
    } else {
      // No user is signed in.
      return false;
    }
  }

  async checkEmailVerification(): Promise<boolean> {
    await this.subAuthState();

    /* const auth = getAuth();
    const user = auth.currentUser; */

    return this.user?.emailVerified || false;
  }

  emailVerification() {
    /* const auth = getAuth();
    const user = auth.currentUser; */

    if(this.user) {
      sendEmailVerification(this.user)
        .then(() => {
          // Email verification sent!
        })
        .catch((error) => {
          console.error('Error sending email verification:', error);
        });
    }
  }

  getEmail() {
    /* const auth = getAuth();
    const user = auth.currentUser; */

    return this.user?.email;
  }

  sendPasswordResetEmail(email: string) {
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
      })
      .catch((error) => {
        console.log('Error sending password reset email:', error);
      });
  }

  getUserId(): any {
    /* const auth = getAuth();
    this.user = auth.currentUser; */

    return this.user?.uid;
  }

  async changeEmail(newEmail: string, password: string) {
    /* const auth = getAuth();
    const user: any = auth.currentUser; */
    const user: any = this.user;

    if (user) {
      try {
        await updateEmail(user, newEmail);
        return true;
      } catch (error: any) {
        if (error.code === 'auth/requires-recent-login') {
          try {
            // Reauthenticate the user with their current credentials
            const emailCredential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, emailCredential);
            
            try {
              // Update the email address again
              await updateEmail(user, newEmail);
              return true;
            } catch (error) {
              console.log('Error changing email');
              return false;
            }
              
          } catch (error) {
            console.log('Error updating email:', error);
            return false;
          }
        } else {
          console.log('Error updating email:', error);
          return false;
        }
      }
    } else {
      console.log('User is not signed in');
      return false;
    }
  }

  async changePassword(oldPassword: string, newPassword:string) {
    const user: any = this.user;

    if (!user) {
      console.log('User is not signed in');
      return false; // Exit the function if the user is not logged in
    }

    try {
      // Reauthenticate the user with their current credentials
      const emailCredential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, emailCredential);

      // Update password
      await updatePassword(user, newPassword);
      //console.log('Password change successful');
      this.errorMsg = null;
      return true;
    } catch (error: any) {
      //console.log('Error changing password:', error);
      this.errorMsg = 'Error changing password: ' + error;
      if (error.code === 'auth/wrong-password') {
        //console.log('Wrong password entered for reauthentication');
        this.errorMsg = 'Wrong current password entered!';
      }
    }

    return false;
  }
  

}
