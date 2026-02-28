import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostDialogComponent } from './create-post-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../services/users/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { User } from '../../../shared/user';
import { HttpResponse, HttpHeaders } from '@angular/common/http';

describe('CreatePostDialogComponent', () => {
  let component: CreatePostDialogComponent;
  let fixture: ComponentFixture<CreatePostDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreatePostDialogComponent>>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'male', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', gender: 'female', status: 'active' }
  ];

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockApiService = jasmine.createSpyObj('ApiService', ['userList']);

    const mockResponse = new HttpResponse({
      body: mockUsers,
      headers: new HttpHeaders()
    });
    mockApiService.userList.and.returnValue(of(mockResponse as any));

    await TestBed.configureTestingModule({
      imports: [
        CreatePostDialogComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(mockApiService.userList).toHaveBeenCalled();
    expect(component.userList).toEqual(mockUsers);
  });

  it('should initialize form with empty values', () => {
    expect(component.newPostForm.get('userName')?.value).toBe('');
    expect(component.newPostForm.get('title')?.value).toBe('');
    expect(component.newPostForm.get('body')?.value).toBe('');
  });

  it('should validate form as invalid when empty', () => {
    expect(component.newPostForm.valid).toBe(false);
  });

  it('should not submit when form is invalid', () => {
    component.submitData();

    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should submit valid form data', () => {
    component.newPostForm.patchValue({
      userName: 'john@example.com',
      title: 'Test Post',
      body: 'Test body that is long enough'
    });

    component.submitData();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      user_id: 1,
      title: 'Test Post',
      body: 'Test body that is long enough'
    });
  });

  it('should clear form when clearForm is called', () => {
    component.newPostForm.patchValue({
      userName: 'john@example.com',
      title: 'Test Post',
      body: 'Test body'
    });

    component.clearForm();

    expect(component.newPostForm.get('userName')?.value).toBeNull();
    expect(component.newPostForm.get('title')?.value).toBeNull();
    expect(component.newPostForm.get('body')?.value).toBeNull();
  });

  it('should validate body max length', () => {
    const bodyControl = component.newPostForm.get('body');
    const longText = 'a'.repeat(1001);

    bodyControl?.setValue(longText);

    expect(bodyControl?.hasError('maxlength')).toBe(true);
  });

  it('should require all fields', () => {
    const form = component.newPostForm;

    expect(form.get('userName')?.hasError('required')).toBe(true);
    expect(form.get('title')?.hasError('required')).toBe(true);
    expect(form.get('body')?.hasError('required')).toBe(true);
  });
});
