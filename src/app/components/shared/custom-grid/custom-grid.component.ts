import {Component, input} from '@angular/core';
import {UserCardComponent} from '../../user-list/user-card/user-card.component';

@Component({
  selector: 'app-custom-grid',
  imports: [
    UserCardComponent
  ],
  templateUrl: './custom-grid.component.html',
  styleUrl: './custom-grid.component.scss'
})
export class CustomGridComponent {

  gridCols = input<number>(1);
}
