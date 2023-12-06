import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPostDetailComponent } from './dialog-post-detail.component';

describe('DialogPostDetailComponent', () => {
  let component: DialogPostDetailComponent;
  let fixture: ComponentFixture<DialogPostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPostDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
