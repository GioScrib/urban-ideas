import {Component, effect, output, signal} from '@angular/core';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-post-list-page-header',
  imports: [
    CustomButtonComponent,
    FormsModule,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    RouterLink,
    MatMenuTrigger
  ],
  templateUrl: './post-list-page-header.component.html',
  styleUrl: './post-list-page-header.component.scss'
})
export class PostListPageHeaderComponent {

  value = signal<string>('');
  gridCols = output<number>();
  newPostClick = output<void>();

  constructor() {
    effect(() => {
      console.log(this.value());
    });
  }

  onClickGridCols(cols: number) {
    console.log("post-list-page-header says grid cols clicked: ", cols);
    this.gridCols.emit(cols);
  }

  onClickNewPost(): void {
    console.log("post-list-page-header says: new post clicked");
    this.newPostClick.emit();
  }
}
