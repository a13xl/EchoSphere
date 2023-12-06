import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPinnedPostsComponent } from './dialog-pinned-posts.component';

describe('DialogPinnedPostsComponent', () => {
  let component: DialogPinnedPostsComponent;
  let fixture: ComponentFixture<DialogPinnedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPinnedPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPinnedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
