import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';
import {CustomDialogContainerComponent} from '../../shared/custom-dialog-container/custom-dialog-container.component';

@Component({
  selector: 'app-create-user-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    CustomButtonComponent,
    CustomDialogContainerComponent,
  ],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent {

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateUserDialogComponent>);

  newUserForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  submitData(): void {
    if(this.newUserForm.invalid) {
      // // Marca tutti i campi come touched per mostrare gli errori di validazione
      // Object.keys(this.newUserForm.controls).forEach(key => {
      //   this.newUserForm.get(key)?.markAsTouched();
      // });
      console.log("create-user-dialog says: form invalid");
      return;
    }
    console.log("create-user-dialog says: ", this.newUserForm);
    this.dialogRef.close(this.newUserForm.value);
  }

  clearForm() {
    this.newUserForm.reset();
  }
}
