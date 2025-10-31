import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListPageHeaderComponent } from './post-list-page-header.component';

describe('PostListPageHeaderComponent', () => {
  let component: PostListPageHeaderComponent;
  let fixture: ComponentFixture<PostListPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListPageHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
