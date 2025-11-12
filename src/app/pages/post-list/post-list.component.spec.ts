import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { ApiService } from '../../services/users/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Post } from '../../shared/post.model';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const mockPosts: Post[] = [
    { id: 1, user_id: 1, title: 'First Post', body: 'This is the first post body' },
    { id: 2, user_id: 2, title: 'Second Post', body: 'This is the second post body' },
    { id: 3, user_id: 1, title: 'Third Post', body: 'This is the third post body' }
  ];

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', [
      'getPostList',
      'addUserPost'
    ]);

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    const mockResponse = new HttpResponse({
      body: mockPosts,
      headers: new HttpHeaders({ 'x-Pagination-Total': '3' })
    });
    mockApiService.getPostList.and.returnValue(of(mockResponse as any));

    await TestBed.configureTestingModule({
      imports: [
        PostListComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    expect(mockApiService.getPostList).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
    expect(component.filteredPosts).toEqual(mockPosts);
    expect(component.total).toBe(3);
    expect(component.isLoading).toBe(false);
  });

  it('should update grid columns', () => {
    component.onClickGridCols(3);
    expect(component.gridCols).toBe(3);
  });

  it('should open create post dialog', () => {
    const dialogRefMock = {
      afterClosed: () => of(null)
    };
    mockDialog.open.and.returnValue(dialogRefMock as any);

    component.onClickNewPost();

    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should create post when dialog returns data', () => {
    const newPost: Post = {
      id: 4,
      user_id: 1,
      title: 'New Post',
      body: 'New post body'
    };

    const dialogRefMock = {
      afterClosed: () => of(newPost)
    };
    mockDialog.open.and.returnValue(dialogRefMock as any);
    mockApiService.addUserPost.and.returnValue(of(newPost));

    component.openCreatePostDialog();

    expect(mockApiService.addUserPost).toHaveBeenCalledWith(newPost);
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Post created successfully',
      'OK',
      { duration: 3000 }
    );
  });

  it('should show error when post creation fails', () => {
    const newPost: Post = {
      id: 4,
      user_id: 1,
      title: 'New Post',
      body: 'New post body'
    };

    const dialogRefMock = {
      afterClosed: () => of(newPost)
    };
    mockDialog.open.and.returnValue(dialogRefMock as any);

    const error = { error: { message: 'Creation failed' } };
    mockApiService.addUserPost.and.returnValue(throwError(() => error));

    component.openCreatePostDialog();

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Creation failed',
      'Chiudi',
      { duration: 3000 }
    );
  });

  it('should filter posts by title', () => {
    component.onSearchKeyValue('first');

    expect(component.filteredPosts.length).toBe(1);
    expect(component.filteredPosts[0].title).toContain('First');
  });

  it('should filter posts by body', () => {
    component.onSearchKeyValue('second post body');

    expect(component.filteredPosts.length).toBe(1);
    expect(component.filteredPosts[0].body).toContain('second post body');
  });

  it('should reset filter when search is empty', () => {
    component.onSearchKeyValue('first');
    expect(component.filteredPosts.length).toBe(1);

    component.onSearchKeyValue('');
    expect(component.filteredPosts).toEqual(mockPosts);
  });

  it('should be case insensitive when filtering', () => {
    component.onSearchKeyValue('FIRST');

    expect(component.filteredPosts.length).toBe(1);
  });

  it('should not call addUserPost when dialog is cancelled', () => {
    const dialogRefMock = {
      afterClosed: () => of(null)
    };
    mockDialog.open.and.returnValue(dialogRefMock as any);

    component.openCreatePostDialog();

    expect(mockApiService.addUserPost).not.toHaveBeenCalled();
  });

  it('should handle undefined dialog data', () => {
    const dialogRefMock = {
      afterClosed: () => of(undefined)
    };
    mockDialog.open.and.returnValue(dialogRefMock as any);

    component.openCreatePostDialog();

    expect(mockApiService.addUserPost).not.toHaveBeenCalled();
  });

  it('should display "No match found" when filtered posts is empty and not loading', () => {
    component.filteredPosts = [];
    component.isLoading = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const noMatchMessage = compiled.querySelector('h2');

    expect(noMatchMessage?.textContent).toContain('No match found');
  });
});
