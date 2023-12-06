import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormValidationService } from 'src/app/service/form-validation.service';
import { SignInComponent } from 'src/app/sign-in/sign-in.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @ViewChild('emailSignIn') emailSignIn!: ElementRef;

  errorMsg = null;
  errorEmailTxt: string = '';
  resetPwdSent: boolean = false;

  constructor(public signIn: SignInComponent, private formValidation: FormValidationService,
    private authentication: AuthenticationService) { }

  async resetPassword(email: string) {
    if(await this.valEmail(email)) {
      this.authentication.sendPasswordResetEmail(email);
      this.resetPwdSent = true;
      setTimeout(() => {
        this.emailSignIn.nativeElement.value = '';
        this.resetPwdSent = false;
        this.signIn.forgotPassword = false;
      }, 5000);
    }
  }

  async valEmail(email: string) {
    if(this.formValidation.testEmailFormat(email)) {
      if(await this.formValidation.testExistEmail(email)) {
        this.errorEmailTxt = 'Email not exist.';
        return false;
      } else {
        // Email exist
        this.errorEmailTxt = '';
        return true;
      }
    }
    // false Email format
    this.errorEmailTxt = 'Email is invalid.';
    return false;
  }
}
