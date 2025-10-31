import {Component, inject, OnInit, signal} from '@angular/core';
import {ApiService} from '../../services/users/api.service';
import {User} from '../../shared/user';
import {UserCardComponent} from '../../components/user-list/user-card/user-card.component';
import {UserListHeaderComponent} from '../../components/user-list/user-list-header/user-list-header.component';
import {CreateUserDialogComponent} from '../../components/user-list/create-user-dialog/create-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/shared/confirm-dialog/confirm-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomGridComponent} from '../../components/shared/custom-grid/custom-grid.component';


@Component({
  selector: 'app-user-list',
  imports: [
    UserCardComponent,
    UserListHeaderComponent,
    CustomGridComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  private readonly apiService = inject(ApiService);

  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar) ;
  users!: User[];
  page: number = 1;
  per_page: number = 10;
  total: number = 0;
  name!: string;
  email!: string;
  gridCols: number = 2;
  panelOpenState1 = signal<boolean>(false);
  panelOpenState2 = signal<boolean>(false);


  constructor() {}

  ngOnInit(): void {
    console.log('user-list initialized');
    this.load();
  }

  load(){
    this.apiService.userList({page: this.page, per_page: this.per_page, name: this.name?? '', email: this.email?? ''}).subscribe(
      res => {
        this.users = res.body?? [];
        console.log("user-list says: ");
        console.log(res.body);
        this.total = Number(res.headers.get('x-Pagination-Total') ?? 0);
      }
    );
  }

  onGridCols(cols: number) {
    console.log("user-list dice: ", cols);
    this.gridCols = cols;
  }

  onNewUser(): void {
    console.log("user-list says: new user clicked");
    this.openCreateUserDialog();
  }

  openCreateUserDialog(): void {
    console.log("user-list says: opening dialog");
    this.dialog.open(CreateUserDialogComponent).afterClosed().subscribe(
      data => {
        console.log("user-list says: sending data...", data);
        if(!data) {
          return;
        }
        this.apiService.createUser(data).subscribe({
          next: () => {
            this.snackBar.open('User created successfully', 'OK', {duration: 3000});
            this.load();
            },
          error: (err) => {
            const msgError = err?.error?.message || "Creation error";
            this.snackBar.open(msgError, 'Chiudi', {duration: 3000});
          }
        })
      }
    );
  }

  onDeleteUser(id: number): void {
    console.log("user-list says deleting user with ", id);
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete User',
        content: 'Are you sure you want to delete this user?',
      }
    });
    ref.afterClosed().subscribe( ok => {
      console.log("confirm-dialog says after closed: ", ok);
      if (!ok) {
        return
      }
      this.apiService.deleteUser(id).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully.', 'OK', {duration: 3000});
          this.load();
          },
        error: () => {
          this.snackBar.open('User deleted failed', 'Chiudi', {duration: 2000});
        }
      })
    })
  }


}
