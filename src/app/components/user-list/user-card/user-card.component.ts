import {Component, input, signal, inject} from '@angular/core';
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


@Component({
  selector: 'app-user-card',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    MatFabButton,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  private readonly httpUserImg: HttpClient = inject(HttpClient);

  user = input.required<User>();
  userImg!: string;

  constructor() {
    const timestamp = new Date().getTime();
    this.userImg = `https://avatar.iran.liara.run/public/girl?${timestamp}`;
  }

  panelOpenState2 = signal<boolean>(false);
}
