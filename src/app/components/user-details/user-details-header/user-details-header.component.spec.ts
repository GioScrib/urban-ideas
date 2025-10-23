import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsHeaderComponent } from './user-details-header.component';

describe('UserListHeaderComponent', () => {
  let component: UserDetailsHeaderComponent;
  let fixture: ComponentFixture<UserDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
