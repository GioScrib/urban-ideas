import {Component, inject, OnInit} from '@angular/core';
import {CustomGridComponent} from '../../components/shared/custom-grid/custom-grid.component';
import {ApiService} from '../../services/users/api.service';
import {Post} from '../../shared/post.model';
import {UserPostCardComponent} from '../../components/shared/user-post-card/user-post-card.component';
import {
  PostListPageHeaderComponent
} from '../../components/post-list/post-list-page-header/post-list-page-header.component';
import {MatDialog} from '@angular/material/dialog';
import {CreatePostDialogComponent} from '../../components/post-list/create-post-dialog/create-post-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CustomGridComponent,
    UserPostCardComponent,
    PostListPageHeaderComponent
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {

  private readonly apiService = inject(ApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  posts: Post[] = [];
  filteredPosts: Post[] = [];
  page: number = 1;
  per_page: number = 10;
  total: number = 0;
  name!: string;
  email!: string;
  gridCols = 2;

  isLoading: boolean = true;

  ngOnInit() {
    console.log('PostListComponent says: initialized');
    this.load();
  }

  load() {
    this.apiService.getPostList({
      page: this.page,
      per_page: this.per_page,
      name: this.name?? '',
      email: this.email?? ''}).subscribe(
      res => {
        this.posts = res.body?? [];
        this.filteredPosts = this.posts;
        this.total = Number(res.headers.get('x-Pagination-Total') ?? 0);
        this.isLoading = false;
        console.log('post-list-component says: ', this.posts);

      }
    )
  }

  onClickGridCols(cols: number) {
    console.log("post-list-component says grid cols clicked: ", cols);
    this.gridCols = cols;
  }

  onClickNewPost() {
    console.log("post-list-component says: new post clicked");
    this.openCreatePostDialog()
  }

  openCreatePostDialog() {
    console.log("post-list-component says: open create post dialog");
    this.dialog.open(CreatePostDialogComponent).afterClosed().subscribe(
      data => {
        console.log("post-list-component says: dialog closed with data: ", data);
        if(!data) {
          return;
        }
        this.apiService.addUserPost(data).subscribe({
          next: () => {
            this.snackBar.open('Post created successfully','OK', {duration: 3000});
            this.load();
          },
          error: (err) => {
            const msgError = err?.error?.message || "Creation error";
            this.snackBar.open(msgError, 'Chiudi', {duration: 3000});
          }
          }
        );
      }
    )
  }

  onSearchKeyValue(value: string) {
    console.log("post-list says: searching for key ", value);
    if(!value || value.length === 0) {
      this.filteredPosts = this.posts;
      return;
    }
    this.filteredPosts = this.posts.filter((post: Post) => {
      return post.title.toLowerCase().includes(value.toLowerCase())
      || post.body.toLowerCase().includes(value.toLowerCase());
    })
  }

}
