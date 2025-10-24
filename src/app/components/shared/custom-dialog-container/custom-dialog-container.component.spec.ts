import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDialogContainerComponent } from './custom-dialog-container.component';

describe('CustomDialogContainerComponent', () => {
  let component: CustomDialogContainerComponent;
  let fixture: ComponentFixture<CustomDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDialogContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
