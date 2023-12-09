import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent {
  verificationSended: boolean = false;


  constructor(public authentication: AuthenticationService,
    public appComponent: AppComponent, public navigation: NavigationService) { }

  sendVerification() {
    this.verificationSended = true;
    this.authentication.emailVerification()

    setTimeout(() => {
      this.verificationSended = false;
      this.navigation.navigateToHome();
    }, 3000);
  }
}
