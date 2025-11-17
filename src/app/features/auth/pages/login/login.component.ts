import { Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatButton,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  token: string = '';

  constructor(private authService: AuthService) {}

  save() {
    this.authService.login(this.token);
  }
}
