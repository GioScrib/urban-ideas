import {Component, input, signal, inject, output} from '@angular/core';
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
export class UserCardComponent {

  private readonly httpUserImg: HttpClient = inject(HttpClient);

  delete = output<number>();

  user = input.required<User>();
  userImg!: string;

  constructor() {
    const timestamp = new Date().getTime();
    this.userImg = `https://avatar.iran.liara.run/public/girl?${timestamp}`;
  }

  onClickDeleteButton() {
    let id = this.user().id
    console.log('user-card says delete user with id: ', id);
    this.delete.emit(id);
  }

  panelOpenState2 = signal<boolean>(false);
}
