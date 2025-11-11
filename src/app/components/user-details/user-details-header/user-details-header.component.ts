import {Component, effect, inject, output, signal} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {FormsModule} from '@angular/forms';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';
import {RouterLink} from '@angular/router';
import {CustomSearchComponent} from '../../shared/custom-search/custom-search.component';

@Component({
  selector: 'app-user-details-page-header',
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    FormsModule,
    CustomButtonComponent,
    RouterLink,
    CustomSearchComponent,
  ],
  templateUrl: './user-details-header.component.html',
  styleUrl: './user-details-header.component.scss'
})
export class UserDetailsHeaderComponent {

  searchKeyValue = output<string>();
  gridCols = output<number>();
  newUser = output<void>();

  onClickGridCols(cols: number) {
    console.log("user-list-header says grid cols clicked: ", cols);
    this.gridCols.emit(cols);
  }

  onClickNewUser(): void {
    console.log("user-list-header says: new user clicked");
    this.newUser.emit();
  }

  onSearchKey(value: string): void {
    console.log("user-details-header says: emitting", value);
    this.searchKeyValue.emit(value)
  }
}
