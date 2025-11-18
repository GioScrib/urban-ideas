import {Component, computed, inject, OnInit, signal} from '@angular/core';
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
import {CustomPaginatorComponent} from '../../components/shared/custom-paginator/custom-paginator.component';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CustomGridComponent,
    UserPostCardComponent,
    PostListPageHeaderComponent,
    CustomPaginatorComponent
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {

  private readonly apiService = inject(ApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  allPosts = signal<Post[]>([]);
  private searchTerm = signal<string>('');
  private pageIndex = signal<number>(0);
  private pageSize = signal<number>(5);
  gridCols = signal<number>(2);

  isLoading: boolean = true;

  // ✅ Getter per template binding
  get page(): number {
    return this.pageIndex();
  }

  get per_page(): number {
    return this.pageSize();
  }

  private searchedPosts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if(!term) {
      return this.allPosts();
    }
    return this.allPosts().filter(post =>
      post.title.includes(term) || post.body.includes(term));
  });

  filteredPosts = computed(() => {
    const posts = this.searchedPosts();
    const start = this.pageSize() * this.pageIndex();
    const end = start + this.pageSize();
    return posts.slice(start, end);
  })

  total = computed(() => this.searchedPosts().length);

  ngOnInit() {
    console.log('PostListComponent says: initialized');
    this.load();
  }

  load() {
    this.apiService.getPostList({
      page: this.page,
      per_page: this.per_page,
      name: '',
      email: ''}).subscribe({
      next: res => {
        this.allPosts.set(res.body?? []);
        // this.total = Number(res.headers.get('x-Pagination-Total') ?? 0);
        // this.isLoading = false;
        console.log('post-list-component says: ', this.allPosts);
      },
      complete: () => {
        this.isLoading = false;
      }
    }

    )
  }

  onClickGridCols(cols: number) {
    console.log("post-list-component says grid cols clicked: ", cols);
    this.gridCols.set(cols);
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
    this.searchTerm.set(value);
    this.pageIndex.set(0); // Reset to first page on new search
    console.log("post-list says: searching for key ", value);
  }


  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    console.log("post-list says: page changed ", event);
  }
}
