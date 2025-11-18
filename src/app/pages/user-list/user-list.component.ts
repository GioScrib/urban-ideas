import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ApiService} from '../../services/users/api.service';
import {User} from '../../shared/user';
import {UserCardComponent} from '../../components/user-list/user-card/user-card.component';
import {UserListHeaderComponent} from '../../components/user-list/user-list-header/user-list-header.component';
import {CreateUserDialogComponent} from '../../components/user-list/create-user-dialog/create-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/shared/confirm-dialog/confirm-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomGridComponent} from '../../components/shared/custom-grid/custom-grid.component';
import {CustomPaginatorComponent} from '../../components/shared/custom-paginator/custom-paginator.component';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-user-list',
  imports: [
    UserCardComponent,
    UserListHeaderComponent,
    CustomGridComponent,
    CustomPaginatorComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  private readonly apiService = inject(ApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar) ;

  private allUsers = signal<User[]>([]);
  private searchTerm = signal<string>('');
  private pageIndex = signal<number>(0);
  private pageSize = signal<number>(5);

  gridCols = signal<number>(2);

  // ✅ Computed per filtrare gli utenti in base alla ricerca
  private searchedUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.allUsers();
    }
    return this.allUsers().filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  // ✅ Computed per applicare la paginazione agli utenti filtrati
  filteredUsers = computed(() => {
    const users = this.searchedUsers();
    const start = this.pageSize() * this.pageIndex();
    const end = start + this.pageSize();
    return users.slice(start, end);
  });

  // ✅ Computed per il totale (usa searchedUsers, non allUsers!)
  total = computed(() => this.searchedUsers().length);

  // ✅ Getter per template binding
  get page(): number {
    return this.pageIndex();
  }

  get per_page(): number {
    return this.pageSize();
  }

  ngOnInit(): void {
    console.log('user-list initialized');
    this.load();
  }

  load(){
    this.apiService.userList({
      page: this.page,
      per_page: this.per_page,
      name:  '',
      email: ''
    }).subscribe({
      next: (res) => {
        this.allUsers.set(res.body ?? []);
        console.log('user-list says: loaded all users', this.allUsers().length);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.snackBar.open('Error loading users', 'Close', {duration: 3000});
      }
    });
  }

  onGridCols(cols: number): void {
    this.gridCols.set(cols);
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
            this.pageIndex.set(0); // ✅ Reset alla prima pagina
            this.load();
            },
          error: (err) => {
            const msgError = err?.error?.message || 'Creation error';
            this.snackBar.open(msgError, 'Close', {duration: 3000});
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
          // ✅ Rimuovi l'utente localmente invece di ricaricare
          const updatedUsers = this.allUsers().filter(u => u.id !== id);
          this.allUsers.set(updatedUsers);

          // ✅ Se la pagina corrente è vuota dopo la cancellazione, vai alla pagina precedente
          if (this.filteredUsers().length === 0 && this.pageIndex() > 0) {
            this.pageIndex.update(p => p - 1);
          }
        },
        error: () => {
          this.snackBar.open('User deletion failed', 'Close', {duration: 2000});
        }
      })
    })
  }

  onSearchKey(value: string): void {
    this.searchTerm.set(value);
    this.pageIndex.set(0); // ✅ Reset alla prima pagina quando si cerca
  }

  onElementsPerPage(value: number) {
    this.pageSize.set(value);
    this.pageIndex.set(0);  // ✅ Reset alla prima pagina
    console.log("user-list says: elements per page", value);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
    console.log("user-list says: per page changed", this.pageSize());
    console.log(event);
  }

}
