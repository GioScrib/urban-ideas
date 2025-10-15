import {Component, input, signal} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatIconButton} from '@angular/material/button';
import {User} from '../../../shared/user';
import {MatIcon} from '@angular/material/icon';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {timestamp} from 'rxjs';

@Component({
  selector: 'app-user-card',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    MatIconButton
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

  panelOpenState1 = signal<boolean>(false);
  panelOpenState2 = signal<boolean>(false);
}
