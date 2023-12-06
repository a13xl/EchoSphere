import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoImprintComponent } from './info-imprint.component';

describe('InfoImprintComponent', () => {
  let component: InfoImprintComponent;
  let fixture: ComponentFixture<InfoImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoImprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
