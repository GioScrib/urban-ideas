import {Component, effect, output, signal} from '@angular/core';
import {CustomButtonComponent} from '../custom-button/custom-button.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-custom-search',
  imports: [
    CustomButtonComponent,
    FormsModule
  ],
  templateUrl: './custom-search.component.html',
  styleUrl: './custom-search.component.scss'
})
export class CustomSearchComponent {

  searchKey = output<string>();

  inputValue = signal<string>("");
  isSearchVisible = false;

  constructor() {
    effect(() => {
      console.log(this.inputValue());
      this.searchKey.emit(this.inputValue());
    });
  }

  onClickSearch() {
    this.isSearchVisible = !this.isSearchVisible;

    //Reset ricerca
    if(!this.isSearchVisible) {
      this.inputValue.set('');
      this.searchKey.emit(this.inputValue());
    }
  }
}
