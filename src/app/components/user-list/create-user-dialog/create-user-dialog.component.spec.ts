import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserDialogComponent } from './create-user-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateUserDialogComponent', () => {
  let component: CreateUserDialogComponent;
  let fixture: ComponentFixture<CreateUserDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreateUserDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        CreateUserDialogComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.newUserForm.get('name')?.value).toBe('');
    expect(component.newUserForm.get('email')?.value).toBe('');
    expect(component.newUserForm.get('gender')?.value).toBe('');
    expect(component.newUserForm.get('status')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.newUserForm.valid).toBe(false);
  });

  it('should validate name as required', () => {
    const nameControl = component.newUserForm.get('name');
    expect(nameControl?.hasError('required')).toBe(true);

    nameControl?.setValue('John Doe');
    expect(nameControl?.hasError('required')).toBe(false);
  });

  it('should validate email as required and email format', () => {
    const emailControl = component.newUserForm.get('email');
    expect(emailControl?.hasError('required')).toBe(true);

    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.hasError('email')).toBe(false);
  });

  it('should validate gender as required', () => {
    const genderControl = component.newUserForm.get('gender');
    expect(genderControl?.hasError('required')).toBe(true);

    genderControl?.setValue('male');
    expect(genderControl?.hasError('required')).toBe(false);
  });

  it('should validate status as required', () => {
    const statusControl = component.newUserForm.get('status');
    expect(statusControl?.hasError('required')).toBe(true);

    statusControl?.setValue('active');
    expect(statusControl?.hasError('required')).toBe(false);
  });

  it('should not submit when form is invalid', () => {
    component.submitData();

    expect(component.newUserForm.invalid).toBe(true);
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should submit valid form data', () => {
    component.newUserForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'male',
      status: 'active'
    });

    component.submitData();

    expect(component.newUserForm.invalid).toBe(false);
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'male',
      status: 'active'
    });
  });

  it('should clear form when clearForm is called', () => {
    component.newUserForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'male',
      status: 'active'
    });

    component.clearForm();

    expect(component.newUserForm.get('name')?.value).toBeNull();
    expect(component.newUserForm.get('email')?.value).toBeNull();
    expect(component.newUserForm.get('gender')?.value).toBeNull();
    expect(component.newUserForm.get('status')?.value).toBeNull();
  });


  it('should have all required form fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const formFields = compiled.querySelectorAll('mat-form-field');

    expect(formFields.length).toBe(4);
  });

  it('should accept valid gender values', () => {
    const genderControl = component.newUserForm.get('gender');

    genderControl?.setValue('male');
    expect(genderControl?.valid).toBe(true);

    genderControl?.setValue('female');
    expect(genderControl?.valid).toBe(true);
  });

  it('should accept valid status values', () => {
    const statusControl = component.newUserForm.get('status');

    statusControl?.setValue('active');
    expect(statusControl?.valid).toBe(true);

    statusControl?.setValue('inactive');
    expect(statusControl?.valid).toBe(true);
  });
});
