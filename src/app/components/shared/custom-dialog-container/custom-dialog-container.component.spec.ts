import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomDialogContainerComponent } from './custom-dialog-container.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('CustomDialogContainerComponent', () => {
  let component: CustomDialogContainerComponent;
  let fixture: ComponentFixture<CustomDialogContainerComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CustomDialogContainerComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [CustomDialogContainerComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when closeDialog is called', () => {
    component.closeDialog();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should have close button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const closeButton = compiled.querySelector('app-custom-button');
    expect(closeButton).toBeTruthy();
  });

  it('should render ng-content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.dialog-container');
    expect(container).toBeTruthy();
  });
});
