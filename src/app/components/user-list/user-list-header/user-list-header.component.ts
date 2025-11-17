import {Component, effect, inject, output, signal} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {FormsModule} from '@angular/forms';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';
import {Router} from '@angular/router';
import {CustomSearchComponent} from '../../shared/custom-search/custom-search.component';

@Component({
  selector: 'app-user-list-header',
  imports: [
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    FormsModule,
    CustomButtonComponent,
    CustomSearchComponent
  ],
  templateUrl: './user-list-header.component.html',
  styleUrl: './user-list-header.component.scss'
})
export class UserListHeaderComponent {

  private router: Router = inject(Router);

  elementsPerPage = output<number>();
  inputValue = output<string>();
  gridCols = output<number>();
  newUser = output<void>();
  isSearchVisible: boolean = false;


  onClickGridCols(cols: number) {
    console.log("user-list-header says grid cols clicked: ", cols);
    this.gridCols.emit(cols);
  }

  onClickNewUser(): void {
    console.log("user-list-header says: new user clicked");
    this.newUser.emit();
  }

  seeAllPosts() {
    this.router.navigate(['posts']).catch(e => console.error(e))
      .then(() => console.log('Navigated to posts'));
  }

  onInputSearch(value: string): void {
    this.inputValue.emit(value);
  }

  onElementsPerPage(value: number) {
    console.log("user-list-header says: elements per page", value);
    this.elementsPerPage.emit(value);
  }

}
