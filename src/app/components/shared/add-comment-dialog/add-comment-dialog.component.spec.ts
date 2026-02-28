import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCommentDialogComponent } from './add-comment-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Post } from '../../../shared/post.model';

describe('AddCommentDialogComponent', () => {
  let component: AddCommentDialogComponent;
  let fixture: ComponentFixture<AddCommentDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AddCommentDialogComponent>>;
  let mockDialogData: { post: Post };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDialogData = {
      post: {
        id: 1,
        user_id: 1,
        title: 'Test Post',
        body: 'Test Body'
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        AddCommentDialogComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive post data', () => {
    expect(component.data.post).toEqual(mockDialogData.post);
  });

  it('should initialize form with empty values', () => {
    expect(component.newCommentForm.get('title')?.value).toBe('');
    expect(component.newCommentForm.get('email')?.value).toBe('');
    expect(component.newCommentForm.get('body')?.value).toBe('');
  });

  it('should validate form as invalid when empty', () => {
    expect(component.newCommentForm.valid).toBe(false);
  });

  it('should validate email format', () => {
    const emailControl = component.newCommentForm.get('email');

    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.hasError('email')).toBe(false);
  });

  // it('should not submit when form is invalid', () => {
  //   component.submitData();
  //
  //   expect(component.isValidForm).toBe(false);
  //   expect(mockDialogRef.close).not.toHaveBeenCalled();
  // });

  it('should submit valid form data', () => {
    component.newCommentForm.patchValue({
      title: 'Test Comment',
      email: 'test@example.com',
      body: 'Test comment body'
    });

    component.submitData();

    expect(component.newCommentForm.valid).toBe(true);
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      post_id: 1,
      name: 'Test Comment',
      email: 'test@example.com',
      body: 'Test comment body'
    });
  });

  it('should clear form when onClearButton is called', () => {
    component.newCommentForm.patchValue({
      title: 'Test Comment',
      email: 'test@example.com',
      body: 'Test comment body'
    });

    component.onClearButton();

    expect(component.newCommentForm.get('title')?.value).toBeNull();
    expect(component.newCommentForm.get('email')?.value).toBeNull();
    expect(component.newCommentForm.get('body')?.value).toBeNull();
  });

  it('should require all fields', () => {
    const form = component.newCommentForm;

    expect(form.get('title')?.hasError('required')).toBe(true);
    expect(form.get('email')?.hasError('required')).toBe(true);
    expect(form.get('body')?.hasError('required')).toBe(true);
  });

  it('should display post title in header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Post');
  });

  it('should display post body in header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Body');
  });
});
