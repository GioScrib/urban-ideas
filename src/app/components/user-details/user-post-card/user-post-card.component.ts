import {Component, inject, input, OnInit, output} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';
import {Post} from '../../../shared/post.model';
import {PostCommentsDialogComponent} from '../post-comments-dialog/post-comments-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CustomPostCardHeaderComponent} from '../../shared/custom-post-card-header/custom-post-card-header.component';
import {UsersService} from '../../../services/users/users.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  private readonly userService = inject(UsersService);

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
        this.userService.addNewComment(this.post().id, data).subscribe(
        )
      }
    )
  }
}
