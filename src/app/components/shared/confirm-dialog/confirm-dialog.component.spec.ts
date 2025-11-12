import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;
  let mockDialogData: ConfirmDialogData;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDialogData = {
      title: 'Confirm Action',
      content: 'Are you sure you want to proceed?'
    };

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dialog title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h4');

    expect(title?.textContent).toContain('Confirm Action');
  });

  it('should display dialog content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const content = compiled.querySelector('p');

    expect(content?.textContent).toContain('Are you sure you want to proceed?');
  });

  it('should close with true when confirm is clicked', () => {
    component.close(true);

    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close with false when cancel is clicked', () => {
    component.close(false);

    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should have cancel button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('app-custom-button');

    expect(buttons.length).toBe(2);
  });

  it('should have confirm button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('app-custom-button');

    expect(buttons.length).toBe(2);
  });

  it('should inject dialog data correctly', () => {
    expect(component.data.title).toBe('Confirm Action');
    expect(component.data.content).toBe('Are you sure you want to proceed?');
  });
});
