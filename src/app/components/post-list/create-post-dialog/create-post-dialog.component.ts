import {Component, inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';
import {CustomDialogContainerComponent} from '../../shared/custom-dialog-container/custom-dialog-container.component';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {ApiService} from '../../../services/users/api.service';
import {User} from '../../../shared/user';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-create-post-dialog',
  imports: [
    CustomButtonComponent,
    CustomDialogContainerComponent,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.scss'
})
export class CreatePostDialogComponent implements OnInit{

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreatePostDialogComponent>);
  private apiService = inject(ApiService);

  isInvalid: boolean = false;
  userList: User[] | null = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.userList({}).subscribe(res => {
      this.userList = res.body;
      console.log("create-post-dialog says: loaded users", this.userList);
    })
  }

  newPostForm: FormGroup = this.fb.group({
    userName: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.maxLength(1000), Validators.required])
  })

  submitData() {
    if(this.newPostForm.invalid){
      console.log("new-poster-dialog says: form invalid");
      return;
    }
    console.log("new-poster-dialog says: ", this.newPostForm);
    let selectedUser = this.userList?.find(user => user.email === this.newPostForm.value.userName);
    let post = {
      user_id: selectedUser?.id,
      title: this.newPostForm.value.title,
      body: this.newPostForm.value.body
    }
    console.log("new-poster-dialog-says: post created", post);
    this.dialogRef.close(post);
  }

  clearForm() {
    this.newPostForm.reset();
  }
}
