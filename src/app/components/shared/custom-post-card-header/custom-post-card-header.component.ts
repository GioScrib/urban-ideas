import {Component, input} from '@angular/core';

@Component({
  selector: 'app-custom-post-card-header',
  imports: [],
  templateUrl: './custom-post-card-header.component.html',
  styleUrl: './custom-post-card-header.component.scss'
})
export class CustomPostCardHeaderComponent {

  title = input<string>('');
  body = input<string>('');


}
