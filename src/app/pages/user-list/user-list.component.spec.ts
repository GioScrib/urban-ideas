// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UserListComponent } from './user-list.component';
// import { ApiService } from '../../services/users/api.service';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { of, throwError } from 'rxjs';
// import { User } from '../../shared/user';
// import {HttpHeaders, HttpResponse} from '@angular/common/http';
//
// describe('UserListComponent', () => {
//   let component: UserListComponent;
//   let fixture: ComponentFixture<UserListComponent>;
//   let mockApiService: jasmine.SpyObj<ApiService>;
//   let mockDialog: jasmine.SpyObj<MatDialog>;
//   let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
//
//   const mockUsers: User[] = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'male', status: 'active' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', gender: 'female', status: 'active' },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', gender: 'male', status: 'inactive' }
//   ];
//
//   beforeEach(async () => {
//     mockApiService = jasmine.createSpyObj('ApiService', [
//       'userList',
//       'createUser',
//       'deleteUser'
//     ]);
//
//     mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
//     mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
//
//     const mockResponse = new HttpResponse({
//       body: mockUsers,
//       headers: new HttpHeaders({ 'x-Pagination-Total': '3' })
//     });
//     mockApiService.userList.and.returnValue(of(mockResponse as any));
//
//     await TestBed.configureTestingModule({
//       imports: [
//         UserListComponent,
//         HttpClientTestingModule,
//         BrowserAnimationsModule
//       ],
//       providers: [
//         { provide: ApiService, useValue: mockApiService },
//         { provide: MatDialog, useValue: mockDialog },
//         { provide: MatSnackBar, useValue: mockSnackBar }
//       ]
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(UserListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should load users on init', () => {
//     expect(mockApiService.userList).toHaveBeenCalled();
//     expect(component.users).toEqual(mockUsers);
//     expect(component.filteredUsers).toEqual(mockUsers);
//     expect(component.total).toBe(3);
//   });
//
//   it('should update grid columns', () => {
//     component.onGridCols(3);
//     expect(component.gridCols).toBe(3);
//   });
//
//   it('should open create user dialog on new user', () => {
//     const dialogRefMock = {
//       afterClosed: () => of(null)
//     };
//     mockDialog.open.and.returnValue(dialogRefMock as any);
//
//     component.onNewUser();
//
//     expect(mockDialog.open).toHaveBeenCalled();
//   });
//
//   it('should create user when dialog returns data', () => {
//     const newUser: User = {
//       id: 4,
//       name: 'New User',
//       email: 'new@example.com',
//       gender: 'male',
//       status: 'active'
//     };
//
//     const dialogRefMock = {
//       afterClosed: () => of(newUser)
//     };
//     mockDialog.open.and.returnValue(dialogRefMock as any);
//     mockApiService.createUser.and.returnValue(of(newUser));
//
//     component.openCreateUserDialog();
//
//     expect(mockApiService.createUser).toHaveBeenCalledWith(newUser);
//     expect(mockSnackBar.open).toHaveBeenCalledWith(
//       'User created successfully',
//       'OK',
//       { duration: 3000 }
//     );
//   });
//
//   it('should show error when user creation fails', () => {
//     const newUser: User = {
//       id: 4,
//       name: 'New User',
//       email: 'new@example.com',
//       gender: 'male',
//       status: 'active'
//     };
//
//     const dialogRefMock = {
//       afterClosed: () => of(newUser)
//     };
//     mockDialog.open.and.returnValue(dialogRefMock as any);
//
//     const error = { error: { message: 'Email already exists' } };
//     mockApiService.createUser.and.returnValue(throwError(() => error));
//
//     component.openCreateUserDialog();
//
//     expect(mockSnackBar.open).toHaveBeenCalledWith(
//       'Email already exists',
//       'Chiudi',
//       { duration: 3000 }
//     );
//   });
//
//   it('should delete user after confirmation', () => {
//     const userId = 1;
//     const dialogRefMock = {
//       afterClosed: () => of(true)
//     };
//     mockDialog.open.and.returnValue(dialogRefMock as any);
//     mockApiService.deleteUser.and.returnValue(of(void 0));
//
//     component.onDeleteUser(userId);
//
//     expect(mockDialog.open).toHaveBeenCalled();
//     expect(mockApiService.deleteUser).toHaveBeenCalledWith(userId);
//     expect(mockSnackBar.open).toHaveBeenCalledWith(
//       'User deleted successfully.',
//       'OK',
//       { duration: 3000 }
//     );
//   });
//
//   it('should not delete user when confirmation is cancelled', () => {
//     const userId = 1;
//     const dialogRefMock = {
//       afterClosed: () => of(false)
//     };
//     mockDialog.open.and.returnValue(dialogRefMock as any);
//
//     component.onDeleteUser(userId);
//
//     expect(mockApiService.deleteUser).not.toHaveBeenCalled();
//   });
//
//   it('should filter users by name', () => {
//     component.onSearchKey('john');
//
//     expect(component.filteredUsers.length).toBe(2);
//     expect(component.filteredUsers[0].name).toContain('John');
//   });
//
//   it('should filter users by email', () => {
//     component.onSearchKey('jane@');
//
//     expect(component.filteredUsers.length).toBe(1);
//     expect(component.filteredUsers[0].email).toContain('jane@');
//   });
//
//   it('should reset filter when search is empty', () => {
//     component.onSearchKey('john');
//     expect(component.filteredUsers.length).toBe(2);
//
//     component.onSearchKey('');
//     expect(component.filteredUsers).toEqual(mockUsers);
//   });
//
//   it('should be case insensitive when filtering', () => {
//     component.onSearchKey('JOHN');
//
//     expect(component.filteredUsers.length).toBe(2);
//   });
//
//   it('should handle error when deleting user', () => {
//     const userId = 1;
//     const dialogRefMock = {
//       afterClosed: () => of(true)
//     };
//     mockDialog.open.and.returnValue(dialogRefMock as any);
//     mockApiService.deleteUser.and.returnValue(throwError(() => new Error('Delete failed')));
//
//     component.onDeleteUser(userId);
//
//     expect(mockSnackBar.open).toHaveBeenCalledWith(
//       'User deleted failed',
//       'Chiudi',
//       { duration: 2000 }
//     );
//   });
// });
