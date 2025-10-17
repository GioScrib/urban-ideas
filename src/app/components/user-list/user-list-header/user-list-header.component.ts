import {Component, effect, inject, output, signal} from '@angular/core';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CreateUserDialogComponent} from '../create-user-dialog/create-user-dialog.component';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';

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
    CustomButtonComponent,
  ],
  templateUrl: './user-list-header.component.html',
  styleUrl: './user-list-header.component.scss'
})
export class UserListHeaderComponent {

  value = signal<string>('');
  gridCols = output<number>();
  newUser = output<void>();

  constructor() {
    effect(() => {
      console.log(this.value());
    });
  }

  onClickGridCols(cols: number) {
    console.log("user-list-header says grid cols clicked: ", cols);
    this.gridCols.emit(cols);
  }

  onClickNewUser(): void {
    console.log("user-list-header says: new user clicked");
    this.newUser.emit();
  }
}
