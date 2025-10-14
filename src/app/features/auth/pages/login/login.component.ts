import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

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
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  save() {
    if(this.token?.trim()){
      console.log("Login component dice: " + this.token);
      localStorage.setItem('auth_token', this.token.trim());
      this.router.navigate(['/users']);
      return;
    }
    console.log("Login component dice: nessun token fornito");
  }
}
