import { Component } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { FormValidationService } from '../service/form-validation.service';
import { AuthenticationService } from '../service/authentication.service';
import { FirestoreUserService } from '../service/firestore-user.service';

@Component({
  selector: 'app-dialog-invite-people',
  templateUrl: './dialog-invite-people.component.html',
  styleUrls: ['./dialog-invite-people.component.scss']
})
export class DialogInvitePeopleComponent {
  appComponentContent: any;
  emailErrorTxt: string = '';
  loggedInUserId: string | undefined;
  loggedInUser: any;

  constructor(public sharedService: SharedService,
    private formValidation: FormValidationService,
    private authentication: AuthenticationService,
    private firestoreUser: FirestoreUserService) {
    this.appComponentContent = this.sharedService.appComponentContent;
    this.loggedInUserId = authentication.getUserId();
    this.getLoggedInUser(this.loggedInUserId);
  }

  async sendInviteBtn(inputString: string) {
    const emailOk = await this.valEmail(inputString);
    
    if(emailOk) {
      // send invite email

      // disable btn and input

      let fd = new FormData();
      const requestingName = this.loggedInUser.username + ' - [ ' + this.loggedInUser.email + ' ] ';

      fd.append('name', requestingName);
      fd.append('message', 
        this.loggedInUser.username + ' want invite you to ' + this.appComponentContent.title);
      fd.append('project', 'invite@' + window.location.origin)
      // send
      await fetch(this.appComponentContent.sendMailService, {
        method: 'POST',
        body: fd
      });

      // message sended

      // show send notification and close component
    }
  }

  async getLoggedInUser(uid: any) {
    this.loggedInUser = await this.firestoreUser.getUser(uid);
  }

  sendInviteKey(event: any, inputString: string) {
    if (event.key === "Enter") {
      this.sendInviteBtn(inputString);
    }
  }

  copyInviteLink() {
    var copyText = window.location.origin + '/sign-up';

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
  }
  
  async valEmail(email: string) {
    if(this.formValidation.testEmailFormat(email)) {
      if(await this.formValidation.testExistEmail(email)) {
        // Email not exist
        this.emailErrorTxt = '';
        return true;
      } else {
        this.emailErrorTxt = 'User already exist';
        return false;
      }
    } else {
      // false Email format
      this.emailErrorTxt = 'Email-Address is invalid';
      return false;
    }
  }
}
