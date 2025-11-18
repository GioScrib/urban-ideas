import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ApiService} from '../../services/users/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../shared/user';
import {Post} from '../../shared/post.model';
import {UserDetailsHeaderComponent} from '../../components/user-details/user-details-header/user-details-header.component';
import {
  UserDetailsPageCardComponent
} from '../../components/user-details/user-details-card/user-details-page-card.component';
import {CustomGridComponent} from '../../components/shared/custom-grid/custom-grid.component';
import {UserPostCardComponent} from '../../components/shared/user-post-card/user-post-card.component';
import {Comment} from '../../shared/comment.model';
import {MatDialog} from '@angular/material/dialog';
import {
  PostCommentsDialogComponent
} from '../../components/user-details/post-comments-dialog/post-comments-dialog.component';
import {CustomPaginatorComponent} from '../../components/shared/custom-paginator/custom-paginator.component';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-user-details-page',
  imports: [
    UserDetailsPageCardComponent,
    UserDetailsHeaderComponent,
    CustomGridComponent,
    UserPostCardComponent,
    CustomPaginatorComponent
  ],
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.scss'
})
export class UserDetailsPageComponent implements OnInit {

  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  user!: User;
  userImg!: string|undefined;
  allPosts = signal<Post[]>([]);
  searchTerm = signal<string>('');
  pageIndex = signal<number>(0);
  pageSize = signal<number>(5);
  allComments = signal<Comment[]>([]);
  gridCols = signal<number>(2);

  postLoading: boolean = true;

  private searchedPosts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if(!term) {
      return this.allPosts();
    }
    return this.allPosts().filter(post =>
      post.title.includes(term) || post.body.includes(term));
  })

  filteredPosts = computed(() => {
    const posts = this.searchedPosts();
    const start = this.pageSize() * this.pageIndex();
    const end = start + this.pageSize();
    return posts.slice(start, end);
  })

  totalPosts = computed(() => this.searchedPosts().length);

  // ✅ Getter per template binding
  get page(): number {
    return this.pageIndex();
  }

  get per_page(): number {
    return this.pageSize();
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getUser(Number.parseInt(id? id : '0')).subscribe(usr => {
      this.user = usr;
      this.userImg = this.apiService.getImgForUser(this.user.id);
      console.log('User details says: user fetched:', this.user);
    });

    this.apiService.getUserPosts(Number.parseInt(id? id : '0')).subscribe({
      next: posts => {
        this.allPosts.set(posts);
        console.log('User details component says: posts fetched', this.allPosts());
      },
      complete: () => {this.postLoading = false}
    })

    console.log('User details component loaded for user with id: ', id);
  }

  onGridCols(gridCols: number): void {
    this.gridCols.set(gridCols);
    console.log('user-details-page says, set gridCols value with: ', gridCols);
  }

  onClickComment() {

  }

  onSearchKeyValue(value: string) {
    this.searchTerm.set(value);
    this.pageIndex.set(0);
    console.log('user-details-page says: search term set to ', value);
  }

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
    console.log('user-details-page says: page changed to index ', event.pageIndex, ' with size ', event.pageSize);
  }
}
