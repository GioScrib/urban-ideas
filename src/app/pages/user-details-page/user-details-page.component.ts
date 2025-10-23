import {Component, inject, OnInit, signal} from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../shared/user';
import {Post} from '../../shared/post.model';
import {UserDetailsHeaderComponent} from '../../components/user-details/user-details-header/user-details-header.component';
import {
  UserDetailsPageCardComponent
} from '../../components/user-details/user-details-card/user-details-page-card.component';
@Component({
  selector: 'app-user-details-page',
  imports: [
    UserDetailsPageCardComponent,
    UserDetailsHeaderComponent
  ],
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.scss'
})
export class UserDetailsPageComponent implements OnInit {

  private readonly userService = inject(UsersService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  user!: User;
  userImg!: string|undefined;
  posts!: Post[];

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUser(Number.parseInt(id? id : '0')).subscribe(usr => {
      this.user = usr;
      this.userImg = this.userService.getImgForUser(this.user.id);
      console.log('User details says: user fetched:', this.user);
    });

    this.userService.getUserPosts(Number.parseInt(id? id : '0')).subscribe(posts => {
      this.posts = posts;
      console.log('User details component says: posts fetched', this.posts);
    })

    console.log('User details component loaded for user with id: ', id);
  }

}
