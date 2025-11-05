import {Component, inject, input, OnInit, output} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {CustomButtonComponent} from '../custom-button/custom-button.component';
import {Post} from '../../../shared/post.model';
import {PostCommentsDialogComponent} from '../../user-details/post-comments-dialog/post-comments-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CustomPostCardHeaderComponent} from '../custom-post-card-header/custom-post-card-header.component';
import {ApiService} from '../../../services/users/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddCommentDialogComponent} from '../add-comment-dialog/add-comment-dialog.component';

@Component({
  selector: 'app-user-post-card',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    CustomButtonComponent,
    MatExpansionPanelTitle,
    CustomPostCardHeaderComponent
  ],
  templateUrl: './user-post-card.component.html',
  styleUrl: './user-post-card.component.scss'
})
export class UserPostCardComponent implements OnInit {

  private readonly dialog = inject(MatDialog);
  private readonly apiService = inject(ApiService);
  private readonly snackBar = inject(MatSnackBar);

  post = input.required<Post>()
  clickComments = output();

  ngOnInit(): void {
    console.log('user-post-card initialized');
  }

  onClickComments() {
    console.log('user-post-card says: comments button clicked');
    this.dialog.open(PostCommentsDialogComponent, {
      data: {
        post: this.post()
      }
    }).afterClosed().subscribe(
      data => {
        console.log("user-post-card says: saving new comment...", data);
        if (!data) {
          return;
        }
        this.apiService.addNewComment(this.post().id, data).subscribe({
          next: () => {
            this.snackBar.open('Comment added successfully', 'OK', {duration: 3000});
          },
          error: (err) => {
            const msgError = err?.error?.message || "Creation error";
            this.snackBar.open(msgError, 'Chiudi', {duration: 3000});
          }
        })
      }
    )
  }

  onClickAddComment() {
    this.dialog.open(AddCommentDialogComponent, {
      data: { post: this.post() }
    }).afterClosed().subscribe(data => {
      console.log("user-post-card says: saving new comment...", data);
      if (!data) {
        return;
      }
      this.apiService.addNewComment(this.post().id, data).subscribe({
        next: () => {
          this.snackBar.open('Comment added successfully', 'OK', { duration: 3000 });
        },
        error: (err) => {
          const msgError = err?.error?.message || "Creation error";
          this.snackBar.open(msgError, 'Chiudi', { duration: 3000 });
        }
      });
    });
  }

}
