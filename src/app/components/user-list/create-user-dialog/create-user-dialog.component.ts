import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';

@Component({
  selector: 'app-create-user-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    CustomButtonComponent,
  ],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent {

  private dialogRef = inject(MatDialogRef<CreateUserDialogComponent>);
  private fb = inject(FormBuilder);

  isInvalid: boolean = false;

  newUserForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitData(): void {
    if(this.newUserForm.invalid) {
      console.log("create-user-dialog says: form invalid");
      this.isInvalid = true;
      return
    }
    this.isInvalid = true;
    console.log("create-user-dialog says: ", this.newUserForm);
    this.dialogRef.close(this.newUserForm.value);
  }

  clearForm() {
    this.newUserForm.reset();
  }
}
