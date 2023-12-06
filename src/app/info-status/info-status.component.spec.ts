import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStatusComponent } from './info-status.component';

describe('InfoStatusComponent', () => {
  let component: InfoStatusComponent;
  let fixture: ComponentFixture<InfoStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
