import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsPageComponent } from './user-details-page.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsPageComponent;
  let fixture: ComponentFixture<UserDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
