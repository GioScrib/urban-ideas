// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UserDetailsPageComponent } from './user-details-page.component';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiService } from '../../services/users/api.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { of } from 'rxjs';
// import { User } from '../../shared/user';
// import { Post } from '../../shared/post.model';
//
// describe('UserDetailsPageComponent', () => {
//   let component: UserDetailsPageComponent;
//   let fixture: ComponentFixture<UserDetailsPageComponent>;
//   let mockApiService: jasmine.SpyObj<ApiService>;
//   let mockRouter: jasmine.SpyObj<Router>;
//   let mockActivatedRoute: any;
//
//   const mockUser: User = {
//     id: 1,
//     name: 'John Doe',
//     email: 'john@example.com',
//     gender: 'male',
//     status: 'active'
//   };
//
//   const mockPosts: Post[] = [
//     { id: 1, user_id: 1, title: 'Post 1', body: 'Body 1' },
//     { id: 2, user_id: 1, title: 'Post 2', body: 'Body 2' },
//     { id: 3, user_id: 1, title: 'Another Post', body: 'Another Body' }
//   ];
//
//   beforeEach(async () => {
//     mockApiService = jasmine.createSpyObj('ApiService', [
//       'getUser',
//       'getUserPosts',
//       'getImgForUser'
//     ]);
//
//     mockRouter = jasmine.createSpyObj('Router', ['navigate']);
//
//     mockActivatedRoute = {
//       snapshot: {
//         paramMap: {
//           get: jasmine.createSpy('get').and.returnValue('1')
//         }
//       }
//     };
//
//     mockApiService.getUser.and.returnValue(of(mockUser));
//     mockApiService.getUserPosts.and.returnValue(of(mockPosts));
//     mockApiService.getImgForUser.and.returnValue('http://example.com/user1.jpg');
//
//     await TestBed.configureTestingModule({
//       imports: [
//         UserDetailsPageComponent,
//         HttpClientTestingModule,
//         BrowserAnimationsModule
//       ],
//       providers: [
//         { provide: ApiService, useValue: mockApiService },
//         { provide: Router, useValue: mockRouter },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute }
//       ]
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(UserDetailsPageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should load user on init', () => {
//     expect(mockApiService.getUser).toHaveBeenCalledWith(1);
//     expect(component.user).toEqual(mockUser);
//   });
//
//   it('should load user posts on init', () => {
//     expect(mockApiService.getUserPosts).toHaveBeenCalledWith(1);
//     expect(component.posts()).toEqual(mockPosts);
//     expect(component.filteredPosts).toEqual(mockPosts);
//   });
//
//   it('should get user image from api service', () => {
//     expect(mockApiService.getImgForUser).toHaveBeenCalledWith(1);
//     expect(component.userImg).toBe('http://example.com/user1.jpg');
//   });
//
//   it('should update grid columns', () => {
//     component.onGridCols(3);
//     expect(component.gridCols).toBe(3);
//   });
//
//   it('should filter posts by title', () => {
//     component.onSearchKeyValue('post 1');
//
//     expect(component.filteredPosts.length).toBe(1);
//     expect(component.filteredPosts[0].title).toContain('Post 1');
//   });
//
//   it('should filter posts by body', () => {
//     component.onSearchKeyValue('another body');
//
//     expect(component.filteredPosts.length).toBe(1);
//     expect(component.filteredPosts[0].body).toContain('Another Body');
//   });
//
//   it('should reset filter when search is empty', () => {
//     component.onSearchKeyValue('post 1');
//     expect(component.filteredPosts.length).toBe(1);
//
//     component.onSearchKeyValue('');
//     expect(component.filteredPosts).toEqual(mockPosts);
//   });
//
//   it('should be case insensitive when filtering', () => {
//     component.onSearchKeyValue('POST 1');
//
//     expect(component.filteredPosts.length).toBe(1);
//   });
//
//   it('should set postLoading to false after posts are loaded', () => {
//     expect(component.postLoading).toBe(false);
//   });
//
//   it('should get user id from route params', () => {
//     expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
//   });
//
//   it('should handle user id from route correctly', () => {
//     mockActivatedRoute.snapshot.paramMap.get.and.returnValue('123');
//     component.ngOnInit();
//
//     expect(mockApiService.getUser).toHaveBeenCalledWith(123);
//   });
//
//   it('should initialize with default grid columns of 2', () => {
//     expect(component.gridCols).toBe(2);
//   });
//
//   it('should reset filtered posts when search value is null', () => {
//     component.filteredPosts = [];
//     component.onSearchKeyValue('');
//
//     expect(component.filteredPosts).toEqual(mockPosts);
//   });
// });
