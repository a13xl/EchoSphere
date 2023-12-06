import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInvitePeopleComponent } from './dialog-invite-people.component';

describe('DialogInvitePeopleComponent', () => {
  let component: DialogInvitePeopleComponent;
  let fixture: ComponentFixture<DialogInvitePeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInvitePeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInvitePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
