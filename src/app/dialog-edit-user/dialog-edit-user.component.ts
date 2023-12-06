import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreUserService } from '../service/firestore-user.service';
import { FormValidationService } from '../service/form-validation.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  currentUserId: string;
  currentUser: any;

  isUsernameEditVisible = false;
  isPwdEditVisible = false;
  isEmailEditVisible = false;

  errorUsername: boolean = false;
  errorNameTxt: string = '';

  pwdShow = 'assets/img/icons/eye.png';
  pwdHide = 'assets/img/icons/eye-crossed-out.png';
  passwordFieldTypes = {
    current: 'password',
    new: 'password',
    repeat: 'password',
    email: 'password'
  };
  currentPwdValue: string;
  newPwdValue: string;
  repeatPwdValue: string;
  pwdChangeSuccess: boolean = false;
  errorPwdTxt: string = '';
  loadingPwd: boolean = false;

  emailPwdValue: string;
  loadingEmail: boolean = false;
  errorEmailTxt: string;
  newEmailValue: string;
  repeatEmailValue: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public firestoreUserService: FirestoreUserService,
    private formValidation: FormValidationService,
    private authentication: AuthenticationService) {
    this.currentUserId = data.currentUserId;
    this.getUser();

    Object.keys(this.passwordFieldTypes).forEach(key => {
      this.passwordFieldTypes[key] = 'password';
    });
  }

  getUser(): void {
    //this.currentUser$ = this.firestoreUserService.getUser(this.currentUserId);
    //console.log('current User:', this.currentUser$);

    this.firestoreUserService.getUser(this.currentUserId).then(user => {
      this.currentUser = user;
      //console.log('current User:', this.currentUser);
    });
  }

  onSelect(event: Event) {
    event.preventDefault();
    window.getSelection()?.removeAllRanges();
  }

  logout() {
    this.authentication.signout();
  }

  // ========== USERNAME ==========
  toggleUsernameEdit() {
    this.isUsernameEditVisible = !this.isUsernameEditVisible;
  }

  async saveUsername(newUsername) {
    // validate input
    const usernameOk = await this.valUsername(newUsername);
    
    if(!this.currentUser.guest){
      if(usernameOk){
        
        if(!this.errorUsername && !this.currentUser.guest) {
          // write change to database
          this.firestoreUserService.changeUsername(newUsername);
        }
        this.toggleUsernameEdit();
      }
    } else {
      this.errorNameTxt = 'Guest-User cannot edit profile'
    }
  }

  async valUsername(username: string) {
    const maxUsernameLength = 30;
    const minUsernameLength = 2;

    if(!this.formValidation.testInputLengthLt(username, minUsernameLength)) {
      this.errorNameTxt = `Username is to short. Min. ${minUsernameLength} characters required.`;
    } else if(!this.formValidation.testInputLengthGt(username, maxUsernameLength)) {
      this.errorNameTxt = `Username is to long. Max. ${maxUsernameLength} characters allowed.`;
    } else {
      const usernameExist = await this.formValidation.testExistUsername(username);
      if(usernameExist) {        
        if(username.toLowerCase() == this.currentUser.username.toLowerCase()) {
          this.errorNameTxt = '';
          this.errorUsername = true;
          return true;
        } else {
          this.errorNameTxt = 'Username already exist.';
        }
      } else {
        this.errorNameTxt = '';
        this.errorUsername = false;
        return true;
      }
    }

    this.errorUsername = true;
    return false;
  }

  saveUsernameKey(event: KeyboardEvent) {
    const saveUsername = document.getElementById('saveUsername')

    if (event.key === "Enter" && saveUsername) {
      saveUsername.click();
    }
  }

  // ========== PASSWORD ==========
  togglePwdEdit() {
    this.isPwdEditVisible = !this.isPwdEditVisible;
  }


  savePasswordKey(event: KeyboardEvent) {
    const savePwd = document.getElementById('savePwd');

    if (event.key === "Enter" && savePwd) {
      savePwd.click();
    }
  }

  async savePwd() { //newPwd: string, repeatPwd: string
    this.loadingPwd = true;
    
    if(this.valPwd()) {
      if(this.valPwdRepeat()) {
        const success = await this.authentication.changePassword(this.currentPwdValue, this.newPwdValue);
        
        if(success) {
          //console.log('Password change successful');
          this.errorPwdTxt = '';
          this.pwdChangeSuccess = true;
          setTimeout(() => {
            this.pwdChangeSuccess = false;
            this.togglePwdEdit();
          }, 5000);
        } else {
          this.errorPwdTxt = this.authentication.errorMsg;
        }
      }
    }
    this.loadingPwd = false;
  }

  toggleShowPwd(field: string) {
    this.passwordFieldTypes[field] = this.passwordFieldTypes[field] === 'password' ? 'text' : 'password';
  }

  valPwd() {
    const pwd = this.newPwdValue;

    if(!this.formValidation.testInputLengthLt(pwd, 8)) {
      this.errorPwdTxt = 'New Password is to weak. Min. 8 characters required.'
    } else if(!this.formValidation.testInputLengthGt(pwd, 30)) {
      this.errorPwdTxt = 'New Password is to long. Max. 30 characters allowed.'
    } else if(!this.formValidation.testInputStrength(pwd, 3)) {
      this.errorPwdTxt = `New Password is to weak. You need 3 of this 4 criteria: 
        uppercase, lowercase, numbers, special characters`;
    } else {
      this.errorPwdTxt = '';
      return true;
    }

    return false;
  }

  valPwdRepeat() {
    if(this.newPwdValue != this.repeatPwdValue) {
      this.errorPwdTxt = `New Passwords doesn't match.`;
      return false;
    } else {
      this.errorPwdTxt = '';
      return true;
    }
  }

  // ========== EMAIL ==========

  toggleEmailEdit() {
    this.isEmailEditVisible = !this.isEmailEditVisible;
  }

  saveEmailKey(event: KeyboardEvent) {
    const saveEmail = document.getElementById('saveEmail');

    if (event.key === "Enter" && saveEmail) {
      saveEmail.click();
    }
  }

  saveEmail() {
    this.loadingEmail = true;

    if(this.valEmail()) {
      if(this.saveEmailAuth()) {
        if (this.saveEmailFirebase()) {

        }
      }
    }

    this.loadingEmail = false;
  }

  async saveEmailFirebase() {
    const success = await this.firestoreUserService.changeEmail(this.newEmailValue);

    if (success) {
      this.errorEmailTxt = '';
      return true;
    } else {
      this.errorEmailTxt = `Couldn't change Email. Please try it later.`;
      return false;
    }
  }

  async saveEmailAuth() {
    const success = await this.authentication.changeEmail(this.newEmailValue, this.emailPwdValue);
    if (success) {
      this.errorEmailTxt = '';
      return true;
    } else {
      this.errorEmailTxt = `Couldn't change Email. Please try it later.`;
      return false;
    }
  }

  async valEmail() {
    const email = this.newEmailValue;
    const repeatEmail = this.repeatEmailValue;

    if(this.formValidation.testEmailFormat(email)) {
      if(await this.formValidation.testExistEmail(email)) {
        // Email not exist
        if(email != repeatEmail) {
          this.errorEmailTxt = `Repeat Email doesn't match`;
          return false;
        } else {
          // email is OK
          this.errorEmailTxt = '';
          return true;
        }
      } else {
        this.errorEmailTxt = 'Email already exist.';
        return false;
      }
    }
    // false Email format
    this.errorEmailTxt = 'Email is invalid.';
    return false;
  }
}
