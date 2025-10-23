import {Component, input} from '@angular/core';
import {User} from '../../../shared/user';

@Component({
  selector: 'app-user-details-page-card',
  imports: [],
  templateUrl: './user-details-page-card.component.html',
  styleUrl: './user-details-page-card.component.scss'
})
export class UserDetailsPageCardComponent {

  user = input.required<User>();
  usrImg = input<string|undefined>('');
}
