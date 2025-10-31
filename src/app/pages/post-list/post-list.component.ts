import {Component, inject} from '@angular/core';
import {CustomGridComponent} from '../../components/shared/custom-grid/custom-grid.component';
import {ApiService} from '../../services/users/api.service';
import {Post} from '../../shared/post.model';
import {UserPostCardComponent} from '../../components/shared/user-post-card/user-post-card.component';
import {
  PostListPageHeaderComponent
} from '../../components/post-list/post-list-page-header/post-list-page-header.component';

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
export class PostListComponent {

  private apiService = inject(ApiService);

  posts: Post[] = [];
  page: number = 1;
  per_page: number = 10;
  total: number = 0;
  name!: string;
  email!: string;
  gridCols = 2;



  constructor() {
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
        console.log('post-list-component says: ', this.posts);
        this.total = Number(res.headers.get('x-Pagination-Total') ?? 0);
      }
    )
  }

  onClickGridCols(cols: number) {
    console.log("post-list-component says grid cols clicked: ", cols);
    this.gridCols = cols;
  }

  onClickNewPost() {
    console.log("post-list-component says: new post clicked");
  }



}
