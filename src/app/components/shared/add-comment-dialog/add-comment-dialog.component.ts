import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../services/users/api.service';
import {Post} from '../../../shared/post.model';
import {CustomDialogContainerComponent} from '../custom-dialog-container/custom-dialog-container.component';
import {CustomPostCardHeaderComponent} from '../custom-post-card-header/custom-post-card-header.component';
import {CustomButtonComponent} from '../custom-button/custom-button.component';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';

export interface CommentsDialogData {
  post: Post;
}

@Component({
  selector: 'app-add-comment-dialog',
  imports: [
    CustomDialogContainerComponent,
    CustomPostCardHeaderComponent,
    CustomButtonComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './add-comment-dialog.component.html',
  styleUrl: './add-comment-dialog.component.scss'
})
export class AddCommentDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddCommentDialogComponent>);
  data = inject<CommentsDialogData>(MAT_DIALOG_DATA);

  newCommentForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    body: new FormControl('', [Validators.required]),
  })

  submitData() {
    if(this.newCommentForm.invalid) {
      console.log("create-user-dialog says: form invalid");
      return
    }
    let newComment = {
      post_id: this.data.post.id,
      name: this.newCommentForm.value.name,
      email: this.newCommentForm.value.email,
      body: this.newCommentForm.value.body
    };
    console.log("add-comment-dialog says: form submitted", this.newCommentForm);
    this.dialogRef.close(newComment);
  }

  onClearButton() {
    this.newCommentForm.reset();
  }
}
