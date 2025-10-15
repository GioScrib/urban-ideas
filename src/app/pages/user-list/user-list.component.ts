import {Component, OnInit, signal} from '@angular/core';
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


@Component({
  selector: 'app-user-list',
  imports: [
    MatGridTile,
    MatGridList,
    UserCardComponent,
    UserListHeaderComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  private readonly userService: UsersService;

  users!: User[];
  page: number = 1;
  per_page: number = 10;
  total: number = 0;
  // TODO: Implementare name e email come variabili di un formgroup
  name!: string;
  email!: string;
  panelOpenState1 = signal<boolean>(false);
  panelOpenState2 = signal<boolean>(false);


  constructor(userService: UsersService) {
    this.userService = userService;
  }

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

}
