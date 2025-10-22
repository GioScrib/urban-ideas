import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {CustomButtonComponent} from '../../components/shared/custom-button/custom-button.component';

@Component({
  selector: 'app-user-details',
  imports: [
    RouterLink,
    CustomButtonComponent
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

}
