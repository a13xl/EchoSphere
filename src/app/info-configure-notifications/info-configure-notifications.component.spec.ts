import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoConfigureNotificationsComponent } from './info-configure-notifications.component';

describe('InfoConfigureNotificationsComponent', () => {
  let component: InfoConfigureNotificationsComponent;
  let fixture: ComponentFixture<InfoConfigureNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoConfigureNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoConfigureNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
