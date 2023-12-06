import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss'],
})
export class DirectMessageComponent /* implements OnInit */ {
  @Input() directMessage: any; 

  constructor(private userService: UserService) {}

  /* ngOnInit(): void {
    //this.userService.loadUsers();
  } */

  getUserName(userId: string): string {
    return this.userService.getUserName(userId);
  }

  getUserPhoto(userId: string): string {
    return this.userService.getUserPhoto(userId);
  }

}
