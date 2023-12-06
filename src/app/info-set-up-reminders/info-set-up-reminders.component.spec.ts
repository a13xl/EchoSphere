import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSetUpRemindersComponent } from './info-set-up-reminders.component';

describe('InfoSetUpRemindersComponent', () => {
  let component: InfoSetUpRemindersComponent;
  let fixture: ComponentFixture<InfoSetUpRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSetUpRemindersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSetUpRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
