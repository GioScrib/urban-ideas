import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPostCardHeaderComponent } from './custom-post-card-header.component';

describe('CustomPostCardHeaderComponent', () => {
  let component: CustomPostCardHeaderComponent;
  let fixture: ComponentFixture<CustomPostCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomPostCardHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPostCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
