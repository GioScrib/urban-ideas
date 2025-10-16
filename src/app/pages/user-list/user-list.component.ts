import {Component, inject, OnInit, signal} from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import {User} from '../../shared/user';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {
  MatAccordion,
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {UserCardComponent} from '../../components/user-list/user-card/user-card.component';
import {UserListHeaderComponent} from '../../components/user-list/user-list-header/user-list-header.component';
import {CreateUserDialogComponent} from '../../components/user-list/create-user-dialog/create-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-user-list',
  imports: [
    UserCardComponent,
    UserListHeaderComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  private readonly userService = inject(UsersService);
  newUserDialog = inject(MatDialog);

  users!: User[];
  page: number = 1;
  per_page: number = 10;
  total: number = 0;
  // TODO: Implementare name e email come variabili di un formgroup
  name!: string;
  email!: string;
  gridCols: number = 3;
  panelOpenState1 = signal<boolean>(false);
  panelOpenState2 = signal<boolean>(false);


  constructor() {}

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.userService.userList({page: this.page, per_page: this.per_page, name: this.name?? '', email: this.email?? ''}).subscribe(
      res => {
        this.users = res.body?? [];
        console.log("UserList dice:");
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

  private openCreateUserDialog(): void {
    console.log("user-list says: opening dialog");
    this.newUserDialog.open(CreateUserDialogComponent);
  }
}
