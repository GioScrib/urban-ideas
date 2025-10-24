import {Component, inject, input} from '@angular/core';
import {CustomButtonComponent} from '../custom-button/custom-button.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    CustomButtonComponent
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  private readonly ref = inject(MatDialogRef<ConfirmDialogComponent>);
  data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  close(v: boolean): void {
    //il metodo close emette un signal di output
    this.ref.close(v);
  }
}
