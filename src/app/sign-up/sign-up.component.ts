import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { FormValidationService } from '../service/form-validation.service';
import { NavigationService } from '../service/navigation.service';
import { FirestoreUserService } from '../service/firestore-user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  @ViewChild('passwordSignUp') pwdField: ElementRef<HTMLInputElement>;
  @ViewChild('passwordRepeat') pwdRepeatField: ElementRef<HTMLInputElement>;

  pwdVisible = false;
  pwdRepeatVisible = false;
  pwdShow = 'assets/img/icons/eye.png';
  pwdHide = 'assets/img/icons/eye-crossed-out.png';
  pwdImg: any = this.pwdShow;
  pwdRepeatImg: any = this.pwdShow;

  errorNameTxt: string = '';
  errorEmailTxt: string = '';
  errorPwdTxt: string = '';
  errorPwdRepeatTxt: string = '';

  loading: boolean = false;
  signUpSucc: boolean = false;

  errorUsername: boolean = false;
  errorEmail: boolean = false;
  errorPwd: boolean = false;
  errorPwdRepeat: boolean = false;

  constructor(public authentication: AuthenticationService, 
      private formValidation: FormValidationService, private navigation: NavigationService,
      public firestoreUser: FirestoreUserService, public appComponent: AppComponent) {
    this.pwdField = {} as ElementRef<HTMLInputElement>;
    this.pwdRepeatField = {} as ElementRef<HTMLInputElement>;

    this.checkSignedInUser();
  }

  async valUsername(username: string) {
    const maxUsernameLength = 30;
    const minUsernameLength = 3;

    if(!this.formValidation.testInputLengthLt(username, minUsernameLength)) {
      this.errorNameTxt = `Username is to short. Min. ${minUsernameLength} characters required.`;
    } else if(!this.formValidation.testInputLengthGt(username, maxUsernameLength)) {
      this.errorNameTxt = `Username is to long. Max. ${maxUsernameLength} characters allowed.`;
    } else if(await this.formValidation.testExistUsername(username)) {
      this.errorNameTxt = 'Username already exist.';
    } else {
      this.errorNameTxt = '';
      this.errorUsername = false;
      return true;
    }

    this.errorUsername = true;
    return false;
  }

  async valEmail(email: string) {
    if(this.formValidation.testEmailFormat(email)) {
      if(await this.formValidation.testExistEmail(email)) {
        // Email not exist
        this.errorEmailTxt = '';
        this.errorEmail = false;
        return 'not exist';
      } else {
        this.errorEmailTxt = 'Email already exist.';
        this.errorEmail = true;
        return 'exist';
      }
    }
    // false Email format
    this.errorEmailTxt = 'Email is invalid.';
    this.errorEmail = true;
    return 'invalid';
  }

  valPwd(pwd: string) {
    if(!this.formValidation.testInputLengthLt(pwd, 8)) {
      this.errorPwdTxt = 'Password is to weak. Min. 8 characters required.'
    } else if(!this.formValidation.testInputLengthGt(pwd, 30)) {
      this.errorPwdTxt = 'Password is to long. Max. 30 characters allowed.'
    } else if(!this.formValidation.testInputStrength(pwd, 3)) {
      this.errorPwdTxt = `Password is to weak. You need 3 of this 4 criteria: 
        uppercase, lowercase, numbers, special characters`;
    } else {
      this.errorPwdTxt = '';
      this.errorPwd = false;
      return true;
    }

    this.errorPwd = true;
    return false;
  }

  valPwdRepeat(pwd: string, pwdRepeat: string) {
    if(pwd != pwdRepeat) {
      this.errorPwdRepeatTxt = `Passwords doesn't match.`;
      this.errorPwdRepeat = true;
      return false;
    } else {
      this.errorPwdRepeatTxt = '';
      this.errorPwdRepeat = false;
      return true;
    }
  }

  async signUp(email: string, password: string, passwordRepeat: string, username: string) {
    this.loading = true;
    const usernameOk = await this.valUsername(username);
    const emailOk = await this.valEmail(email);
    const pwdOk = await this.valPwd(password);
    const pwdRepeatOk = await this.valPwdRepeat(password, passwordRepeat);
    
    if (usernameOk && emailOk && pwdOk && pwdRepeatOk) {
      try {
        const userId = await this.authentication.sigup(email, password);
        // create User in DB ('users')
        await this.firestoreUser.addUser(userId);
        
        this.signUpSucc = true;
        setTimeout(() => {
          this.authentication.signin(email, password);
          this.navigation.navigateToSignIn();
        }, 3000);
      } catch (error) {
        console.log('Error during sign up:', error);
      }
    }
    this.signUpSucc = false;
    this.loading = false;
  }

  toggleShowPwd(pwdRepeatInput: boolean) {
    if(pwdRepeatInput) {
      this.pwdRepeatVisible = !this.pwdRepeatVisible;
      this.pwdRepeatField.nativeElement.type = this.pwdRepeatVisible ? 'text' : 'password';
      this.pwdRepeatImg = this.pwdRepeatVisible ? this.pwdHide : this.pwdShow;
    } else {
      this.pwdVisible = !this.pwdVisible;
      this.pwdField.nativeElement.type = this.pwdVisible ? 'text' : 'password';
      this.pwdImg = this.pwdVisible ? this.pwdHide : this.pwdShow;
    }
  }

  signUpKey(event: KeyboardEvent) {
    const signUpBtn = document.getElementById('signUpBtn');

    if (event.key === "Enter" && signUpBtn) {
      signUpBtn.click();
    }
  }

  onSelect(event: Event) {
    event.preventDefault();
    window.getSelection()?.removeAllRanges();
  }

  async checkSignedInUser() { 
    if(await this.authentication.checkAuthUser()) {
      // go back
      this.navigation.navigateToPreviousPage();
    } // else nobody signed in
  }

}
