import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat.component';
import { TextEditComponent } from './text-edit/text-edit.component';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DialogEditChannelComponent } from './dialog-edit-channel/dialog-edit-channel.component';
import { DialogDeleteChannelComponent } from './dialog-delete-channel/dialog-delete-channel.component';
import { PostComponent } from './post/post.component';

import 'emoji-picker-element';
import { DialogEmojiPickerComponent } from './dialog-emoji-picker/dialog-emoji-picker.component';
import { EmailVerificationComponent } from './component/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { InfoComponent } from './info/info.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { InfoStatusComponent } from './info-status/info-status.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { DialogPinnedPostsComponent } from './dialog-pinned-posts/dialog-pinned-posts.component';
import { DialogShowUserComponent } from './dialog-show-user/dialog-show-user.component';
import { DialogPostDetailComponent } from './dialog-post-detail/dialog-post-detail.component';
import { DialogInvitePeopleComponent } from './dialog-invite-people/dialog-invite-people.component';
import { RelativeTimePipe } from './../app/post/relative-time.pipe';
import { InfoConfigureNotificationsComponent } from './info-configure-notifications/info-configure-notifications.component';
import { InfoSetUpRemindersComponent } from './info-set-up-reminders/info-set-up-reminders.component';
import { InfoImprintComponent } from './info-imprint/info-imprint.component';
import { ProfilepictureComponent } from './profilepicture/profilepicture.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
//import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ChatComponent,
    TextEditComponent,
    DialogAddChannelComponent,
    WelcomeComponent,
    SignInComponent,
    SignUpComponent,
    DialogEditChannelComponent,
    DialogDeleteChannelComponent,
    PostComponent,
    DialogEmojiPickerComponent,
    InfoComponent, 
    InfoDialogComponent, 
    EmailVerificationComponent,
    InfoConfigureNotificationsComponent,
    RelativeTimePipe,
    ForgotPasswordComponent,
    InfoStatusComponent,
    InfoUserComponent,
    DialogPinnedPostsComponent,
    InfoSetUpRemindersComponent,
    InfoImprintComponent,
    DialogInvitePeopleComponent,
    DialogPostDetailComponent,
    DialogShowUserComponent,
    ProfilepictureComponent,
    DirectMessageComponent,
    DialogEditUserComponent,
    //PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatDividerModule,
    MatExpansionModule,
    HttpClientModule,
    AngularEditorModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatSnackBarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
