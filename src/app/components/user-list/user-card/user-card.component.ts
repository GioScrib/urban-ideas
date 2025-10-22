import {Component, input, signal, inject, output, OnInit, AfterViewInit} from '@angular/core';
import {MatFabButton} from '@angular/material/button';

import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from '@angular/material/expansion';
import {User} from '../../../shared/user';
import {HttpClient} from '@angular/common/http';
import {MatIcon} from '@angular/material/icon';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';
import {provideRouter, Router, RouterLink} from '@angular/router';
import {routes} from '../../../app.routes';


@Component({
  selector: 'app-user-card',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    CustomButtonComponent,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit{

  private readonly httpUserImg: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  delete = output<number>();

  user = input.required<User>();
  userImg!: string;

  constructor() {
  }

  ngOnInit(): void {
    const timestamp = new Date().getTime();
    if(this.user().gender === 'male'){
      this.userImg = `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.user().id}&gender=male`;
    } else {
      this.userImg = `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.user().id}&gender=female`;
    }
    console.log('UserCardComponent says user img requested on: ', this.userImg);
  }


  onClickDeleteButton() {
    let id = this.user().id
    console.log('user-card says delete user with id: ', id);
    this.delete.emit(id);
  }

  //Gestione routes

  //assoluta
  openDetails() {
    console.log('user-card says open details of user with id: ', this.user().id);
    this.router.navigate(['/users', this.user().id]).then(r => {});  // /users/:id
  }

  panelOpenState2 = signal<boolean>(false);
}
