import {Component, inject} from '@angular/core';
import {CustomButtonComponent} from '../custom-button/custom-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog-container',
  imports: [
    CustomButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './custom-dialog-container.component.html',
  styleUrl: './custom-dialog-container.component.scss'
})
export class CustomDialogContainerComponent {

  private readonly dialogRef = inject(MatDialogRef<CustomDialogContainerComponent>);

  closeDialog(): void {
    this.dialogRef.close();
    console.log('custom-dialog-container says closed');
  }
}
