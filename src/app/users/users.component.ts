import { Component } from '@angular/core';
import { FirestoreUserService } from '../service/firestore-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogShowUserComponent } from '../dialog-show-user/dialog-show-user.component';
import { AuthenticationService } from '../service/authentication.service';
import { DialogInvitePeopleComponent } from '../dialog-invite-people/dialog-invite-people.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  currentUserId: string | undefined;
  users: any;
  allUsers: any;
  numOfUsers: number | undefined;
  userOrUsersString: string = 'User'; // name after "number of users"
  inputValue = ''; // searchbar input value

  constructor(private firestoreUser: FirestoreUserService, public dialog: MatDialog,
      private authentication: AuthenticationService) {
    this.currentUserId = authentication.getUserId();
    this.getUsers();
  }

  async getUsers() {
    this.users = await this.firestoreUser.getAllUsers();
    this.allUsers = this.users;

    this.numOfUsersLabel();
  }

  async numOfUsersLabel() {
    this.numOfUsers = await Object.keys(this.users).length;

    if(this.numOfUsers > 1) {
      this.userOrUsersString = 'Users';
    } else {
      this.userOrUsersString = 'User';
    }
  }

  clearSearchbar() {
    this.inputValue = '';
    this.users = this.allUsers;
  }

  showUser(user: any) {
    this.dialog.open(DialogShowUserComponent, {
      data: { user: user },
    });
  }

  invitePeople() {
    this.dialog.open(DialogInvitePeopleComponent, { });
  }

  // Function to search for users with username or email
  searchUsers(searchTerm: string): any {
    const searchTermLowerCase = searchTerm.toLowerCase();

    // Filter through the users' data and return matching users
    const matchingUsers = this.allUsers.filter((user: any) => {
      let emailLowerCase = ''; // DELETE AFTER DB RECREATE

      const usernameLowerCase = user.username.toLowerCase();

      // REMOVE TRY AND CATCH AFTER DB RECREATE
      try{
        emailLowerCase = user.email.toLowerCase();
      } catch (error) {
        //console.log(user.username, 'have no email');
      }

      // Check if the username or email contains the searchTerm (case-insensitive)
      return usernameLowerCase.includes(searchTermLowerCase) || emailLowerCase.includes(searchTermLowerCase);
    });

    this.users = matchingUsers;
    this.numOfUsersLabel();
  }
}
