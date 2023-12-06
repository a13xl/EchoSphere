import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Event as NavigationEvent, NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

import { ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { LoadingService } from './service/loading.service';
import { InfoComponent } from './info/info.component';
import { AuthenticationService } from './service/authentication.service';
import { InfoUserComponent } from './info-user/info-user.component';
import { SharedService } from './service/shared.service';
import { ChatService } from './service/chat.service';
import { FirestoreUserService } from './service/firestore-user.service';
import { BehaviorSubject } from 'rxjs';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'EchoSphere';
  logo = 'assets/img/Logo.png';
  logoName = 'assets/img/LogoName.png';
  sendMailService =
    'https://gruppe-597.developerakademie.net/send_mail/send_mail.php';

  panelOpenState1 = false;
  panelOpenState2 = false;
  dataLoaded = false;
  isSidebarOpened: boolean = true;
  logSide: boolean = false;

  @ViewChild('drawer') drawer!: MatDrawer;

  @ViewChild(InfoComponent) infoComponent!: InfoComponent;
  allChannels: any = [];
  personalChats: any = [];
  //personalChats: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  currentUserId: string | undefined;
  currentUserImage: string | undefined;
  getUserInterval: any; // interval to get current signed in user
  getImageInterval: any; // interval to get current signed in user Image

  // NEW
  personalChatsWithUsernamesAndPhotos: any[] | undefined;

  isMobileView = true;

  /**
   * Constructor of AppComponent
   * @param {ChangeDetectorRef} cdr - Injected service for managing change detection.
   */
  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private firestore: Firestore,
    public loadingService: LoadingService,
    private cd: ChangeDetectorRef,
    public authentication: AuthenticationService,
    public router: Router,
    private sharedService: SharedService,
    private chatService: ChatService,
    public firestoreUserService: FirestoreUserService
  ) {
    // setup appComponent-Variable in SharedService
    this.sharedService.appComponentContent = {
      title: this.title,
      logo: this.logo,
      logoName: this.logoName,
    };
  }

  ngOnInit(): void {
    this.readData();
    this.printCurrentUser();
    this.pathCheck();
    this.getCurrentUserId();
    this.getCurrentUserImage();
  }

  pathCheck() {
    this.router.events
      .pipe(
        filter(
          (event: NavigationEvent): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        console.log(event.urlAfterRedirects);
        if (
          event.urlAfterRedirects === '/sign-in' ||
          event.urlAfterRedirects === '/sign-up'
        ) {
          console.log('drawer closed pfad');
          this.logSide = true;
          console.log('bin ich auf loginseite',this.logSide);
          console.log('Sidebar: ', this.isSidebarOpened);
          // this.drawer.close();
          this.isSidebarOpened = false;
        } else {
          this.logSide = false;
          console.log('nicht auf login/up: ', this.logSide);
          if (window.innerWidth >= 768) {
            // this.drawer.open();
            this.isSidebarOpened = true;
          }
        }
      });
  }

  /**
   * Start the loading animation, from the loadingService
   */
  startLoading() {
    this.loadingService.setLoadingState(true);
  }

  printCurrentUser() {
    const currentUser = this.authentication.user?.uid;
    console.log('Aktuell angemeldeter Benutzer:', currentUser);
  }

  switchVisible() {
    this.infoComponent.switchVisible();
  }
  /**
   * Stop the loading animation, from the loadingService
   */
  stopLoading() {
    this.loadingService.setLoadingState(false);
  }

  readData() {
    this.startLoading();
    let changes;
    const collectionRef = collection(this.firestore, 'channels');
    onSnapshot(collectionRef, (snapshot) => {
      changes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Sortiere das Array nach dem channelName, wenn das Feld vorhanden ist
      changes.sort((a: any, b: any) => {
        if (a.channelName && b.channelName) {
          return a.channelName.localeCompare(b.channelName);
        }
        return 0;
      });

      this.allChannels = changes;

      //TODO: console.log entfernen
      //console.log('changes', changes);
      this.dataLoaded = true;
      this.stopLoading();
    });
  }

  /**
   * Angular's AfterViewInit lifecycle hook, executes after the component's view (and child views) has been initialized.
   * Here, we're setting up the viewport checker and event listener for window resizing.
   */

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkViewport();
      this.cdr.detectChanges();

      window.addEventListener('resize', () => {
        this.checkViewport();
        this.cdr.detectChanges();
      });
    }, 0);
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  /**
   * This method checks the viewport width to decide the mode of the drawer.
   * If the width is less than or equal to 768px, it assumes that the user is in mobile view and sets the drawer mode accordingly.
   */
  checkViewport() {
    if (this.logSide) {
      console.log('return from checkviewport');
      return;
    }
    this.isMobileView = window.innerWidth <= 768; // TODO Adjust the breakpoint as needed
    this.drawer.opened = !this.isMobileView;
    this.isSidebarOpened = !this.isMobileView;
    this.drawer.mode = this.isMobileView ? 'over' : 'side';
    console.log('isSidebarOpenedFromCheckViewpoart', this.isSidebarOpened);
  }

  /**
   * This method is called when a link in the sidenav is clicked.
   * If the user is in mobile view, it will close the sidenav.
   */
  onLinkClicked() {
    if (this.isMobileView) {
      this.drawer.close();
    }
  }

  onToggleSidebar() {
    this.drawer.toggle();
    this.isSidebarOpened = !this.isSidebarOpened;
    console.log('isSidebarOpened', this.isSidebarOpened);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAddChannelComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  setStatus() {
    this.dialog.open(DialogEditUserComponent, {
      data: {currentUserId: this.currentUserId},
    });
  }

  /* setStatus() {
    this.dialog.open( InfoUserComponent, {
      height: '50%',
      width: '40%',
    });
  } */

  getCurrentUserId() {
    // interval to check if user is signed in
    this.getUserInterval = setInterval(() => {
      if (!this.currentUserId) {
        this.currentUserId = this.authentication.getUserId();
      } else {
        // destroy interval, if user is signed in
        clearInterval(this.getUserInterval);
        this.chatService.getAllChats(this.currentUserId);
        this.getPersonalChats();
      }
    }, 255);
  }

  async getCurrentUserImage() {
    this.getImageInterval = setInterval(async () => {
      if (this.currentUserId) {
        const user = await this.firestoreUserService.getUser(
          this.currentUserId
        );
        if (user && user.photo) {
          this.currentUserImage = user.photo;
          clearInterval(this.getImageInterval); // destroy interval once the image is fetched
        }
      }
    }, 255);
  }

  /* async getPersonalChats() {
    if (this.currentUserId) {
      this.personalChats = await this.chatService.getAllChatsByUserId(this.currentUserId);

      //console.log('All my Chats:', this.personalChats);
      this.getPersonalChatsUsernameAndPhoto();
    } else {
      console.log('Cannot get Chats because no UserId found!');
    }
  } */

  async getPersonalChats() {
    if (this.currentUserId) {

      this.chatService.ownChatsSubject.subscribe(ownChats => {
        //this.personalChats.next(ownChats);
        this.personalChats = ownChats;
        //console.log('All my Chats:', this.personalChats);
        this.getPersonalChatsUsernameAndPhoto();
      });

    } else {
      console.log('Cannot get Chats because no UserId found!');
    }
  }

  async getPersonalChatsUsernameAndPhoto() {
    this.personalChatsWithUsernamesAndPhotos = [];

    for (const chat of this.personalChats) {
      const otherUserId =
        chat.person1Id === this.currentUserId ? chat.person2Id : chat.person1Id;
      const user = await this.firestoreUserService.getUser(otherUserId);
      if (user) {
        const chatWithUsername = {
          ...chat,
          partner: user.username,
          photo: user.photo,
        };
        //console.log('chat with',chatWithUsername);
        
        this.personalChatsWithUsernamesAndPhotos.push(chatWithUsername);
      }
    }
  }

}


