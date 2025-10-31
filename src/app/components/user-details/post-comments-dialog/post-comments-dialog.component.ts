import {Component, effect, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {CustomDialogContainerComponent} from '../../shared/custom-dialog-container/custom-dialog-container.component';
import {Post} from '../../../shared/post.model';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';
import {ApiService} from '../../../services/users/api.service';
import {Comment} from '../../../shared/comment.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CreateUserDialogComponent} from '../../user-list/create-user-dialog/create-user-dialog.component';
import {CustomPostCardHeaderComponent} from '../../shared/custom-post-card-header/custom-post-card-header.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface PostCommentsDialogData {
  post: Post;
}

@Component({
  selector: 'app-post-comments-dialog',
  imports: [
    CustomDialogContainerComponent,
    CustomButtonComponent,
    CustomPostCardHeaderComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormField,
    MatLabel
  ],
  templateUrl: './post-comments-dialog.component.html',
  styleUrl: './post-comments-dialog.component.scss'
})
export class PostCommentsDialogComponent implements OnInit {

  private readonly apiService: ApiService = inject(ApiService);
  private readonly dialogRef = inject(MatDialogRef<CreateUserDialogComponent>);
  private readonly fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  @ViewChild('commentFormContainer') commentFormContainer!: ElementRef;

  data = inject<PostCommentsDialogData>(MAT_DIALOG_DATA);
  postComments: Comment[] = [];
  addingComment: boolean = false;
  isValidForm: boolean = false;

  newCommentForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    comment: new FormControl('', [Validators.required]),
  })

  constructor() {
  }

  ngOnInit() {
    console.log('post-comments-dialog says: post recived', this.data.post);
    this.loadPostComments();
  }

  loadPostComments(){
    this.apiService.getCommentsForPost(this.data.post?.id).subscribe(comments => {
      this.postComments = comments;
      console.log('post-comments-dialog says comments fetched for post with id: ' + this.data.post.id, comments);
    })
  }

  onAddComment() {
    this.addingComment = true;
    // Attendi che il DOM si aggiorni prima di scrollare
    setTimeout(() => {
      this.commentFormContainer?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }, 0);
  }

  onCloseButton() {
    this.addingComment = false;
    this.newCommentForm.reset();
  }

  submitData() {
    if(this.newCommentForm.invalid) {
      console.log("create-user-dialog says: form invalid");
      this.isValidForm = false;
    }
    this.isValidForm = true;

    let newComment = this.newCommentForm.value;
    let postId = this.data.post.id;
    this.apiService.addNewComment(postId, newComment).subscribe({
        next: () => {
          this.loadPostComments();
          this.snackBar.open('Comment added successfully', 'OK', {duration: 3000});
        },
        error: (err) => {
          const msgError = err?.error?.message || "Creation error";
          this.snackBar.open(msgError, 'Chiudi', {duration: 3000});
        }
      }
    )
  }

}
