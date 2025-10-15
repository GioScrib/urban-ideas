import {Component, effect, signal} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-list-header',
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    FormsModule,
  ],
  templateUrl: './user-list-header.component.html',
  styleUrl: './user-list-header.component.scss'
})
export class UserListHeaderComponent {

  value = signal<string>('');

  constructor() {
    effect(() => {
      console.log(this.value());
    });
  }
}
