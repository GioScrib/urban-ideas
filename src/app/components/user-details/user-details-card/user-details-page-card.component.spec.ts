import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsPageCardComponent } from './user-details-page-card.component';

describe('UserDetailsCardComponent', () => {
  let component: UserDetailsPageCardComponent;
  let fixture: ComponentFixture<UserDetailsPageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsPageCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsPageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
