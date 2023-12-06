import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']

  
})
export class InfoComponent {

  visible = false;

  constructor(public dialog: MatDialog) {}

  switchVisible() {
    this.visible = !this.visible
  }

  
  closeDialog() {
    this.switchVisible()
  }
}
  

 