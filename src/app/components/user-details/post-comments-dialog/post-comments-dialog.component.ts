import {Component, effect, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {CustomDialogContainerComponent} from '../../shared/custom-dialog-container/custom-dialog-container.component';
import {Post} from '../../../shared/post.model';
import {ApiService} from '../../../services/users/api.service';
import {Comment} from '../../../shared/comment.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomPostCardHeaderComponent} from '../../shared/custom-post-card-header/custom-post-card-header.component';
import {ReactiveFormsModule} from '@angular/forms';

export interface PostCommentsDialogData {
  post: Post;
}

@Component({
  selector: 'app-post-comments-dialog',
  imports: [
    CustomDialogContainerComponent,
    CustomPostCardHeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './post-comments-dialog.component.html',
  styleUrl: './post-comments-dialog.component.scss'
})
export class PostCommentsDialogComponent implements OnInit {

  private readonly apiService: ApiService = inject(ApiService);
  @ViewChild('commentFormContainer') commentFormContainer!: ElementRef;

  data = inject<PostCommentsDialogData>(MAT_DIALOG_DATA);
  postComments: Comment[] = [];

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
}
