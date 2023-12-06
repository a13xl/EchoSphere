import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDirectMessagesComponent } from './info-direct-messages.component';

describe('InfoDirectMessagesComponent', () => {
  let component: InfoDirectMessagesComponent;
  let fixture: ComponentFixture<InfoDirectMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDirectMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDirectMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
