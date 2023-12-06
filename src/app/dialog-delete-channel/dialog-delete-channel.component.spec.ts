import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteChannelComponent } from './dialog-delete-channel.component';

describe('DialogDeleteChannelComponent', () => {
  let component: DialogDeleteChannelComponent;
  let fixture: ComponentFixture<DialogDeleteChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
