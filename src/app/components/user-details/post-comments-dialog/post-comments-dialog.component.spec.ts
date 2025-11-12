// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { PostCommentsDialogComponent } from './post-comments-dialog.component';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ApiService } from '../../../services/users/api.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs';
// import { Post } from '../../../shared/post.model';
// import { Comment } from '../../../shared/comment.model';
//
// describe('PostCommentsDialogComponent', () => {
//   let component: PostCommentsDialogComponent;
//   let fixture: ComponentFixture<PostCommentsDialogComponent>;
//   let mockApiService: jasmine.SpyObj<ApiService>;
//   let mockDialogData: { post: Post };
//
//   const mockComments: Comment[] = [
//     {
//       id: 1,
//       post_id: 1,
//       name: 'Comment 1',
//       email: 'user1@example.com',
//       body: 'This is comment 1'
//     },
//     {
//       id: 2,
//       post_id: 1,
//       name: 'Comment 2',
//       email: 'user2@example.com',
//       body: 'This is comment 2'
//     }
//   ];
//
//   beforeEach(async () => {
//     mockApiService = jasmine.createSpyObj('ApiService', ['getCommentsForPost']);
//     mockDialogData = {
//       post: {
//         id: 1,
//         user_id: 1,
//         title: 'Test Post',
//         body: 'Test Body'
//       }
//     };
//
//     mockApiService.getCommentsForPost.and.returnValue(of(mockComments));
//
//     await TestBed.configureTestingModule({
//       imports: [
//         PostCommentsDialogComponent,
//         HttpClientTestingModule
//       ],
//       providers: [
//         { provide: ApiService, useValue: mockApiService },
//         { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
//       ]
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(PostCommentsDialogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should receive post data', () => {
//     expect(component.data.post).toEqual(mockDialogData.post);
//   });
//
//   it('should load comments on init', () => {
//     expect(mockApiService.getCommentsForPost).toHaveBeenCalledWith(1);
//     expect(component.postComments).toEqual(mockComments);
//   });
//
//   it('should display post title', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.textContent).toContain('Test Post');
//   });
//
//   it('should display post body', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.textContent).toContain('Test Body');
//   });
//
//   it('should display all comments', () => {
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     const commentCards = compiled.querySelectorAll('app-custom-post-card-header');
//     // One for post header, rest for comments
//     expect(commentCards.length).toBe(mockComments.length + 1);
//   });
//
//   it('should display "No comments yet" when there are no comments', () => {
//     mockApiService.getCommentsForPost.and.returnValue(of([]));
//
//     const newFixture = TestBed.createComponent(PostCommentsDialogComponent);
//     const newComponent = newFixture.componentInstance;
//     newFixture.detectChanges();
//
//     const compiled = newFixture.nativeElement as HTMLElement;
//     expect(compiled.textContent).toContain('No comments yet');
//   });
//
//   it('should display comment names', () => {
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.textContent).toContain('Comment 1');
//     expect(compiled.textContent).toContain('Comment 2');
//   });
//
//   it('should display comment bodies', () => {
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.textContent).toContain('This is comment 1');
//     expect(compiled.textContent).toContain('This is comment 2');
//   });
// });
