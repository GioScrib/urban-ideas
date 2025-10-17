import {Component, input, output} from '@angular/core';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon
  ],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {

  matIconName = input<string>('');
  matButtonContent = input<string>('');
  backGroundColor = input<string>('');
  textColor = input<string>('');
  waveColor = input<string>('');
  clicked = output<void>();

  onClick() {
    console.log('custom button' + this.matIconName + 'says clicked');
    this.clicked.emit();
  }
}
