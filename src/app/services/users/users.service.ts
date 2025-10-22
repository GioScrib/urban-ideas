import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../shared/user';
import {Post} from '../../shared/post.model';

const API = "https://gorest.co.in/public/v2";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly httpClient: HttpClient;
  private authToken: string | null;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.authToken = localStorage.getItem('auth_token');
  }

  userList(params: {
    page?: number,
    per_page?: number,
    name?: string,
    email?: string
  }) {
    let p = new HttpParams();

    if(params['page']) {
      p.set('page', params['page']);
    }
    if(params['per_page']) {
      p.set('per_page', params['per_page']);
    }
    if(params['name']) {
      p.set('name', params['name']);
    }
    if(params['email']) {
      p.set('email', params['email']);
    }
    return this.httpClient.get<User[]>(API + '/users/', {params: p, observe: 'response'});
  }

  getUser(id: number) {
    return this.httpClient.get<User>(API + '/users/' + id);
  }

  // GET /public/v2/users/7508084/posts
  getUserPosts(userId: number) {
    return this.httpClient.get<Post[]>(API + '/users/' + userId + '/posts');
  }

  // GET /public/v2/posts/7508084/comments	Retrieves post comments
  getCommentsForPost(postId: number) {
    return this.httpClient.get<Comment[]>(API + '/posts/' + postId + '/comments');
  }

  // POST /public/v2/posts/7508084/comments	Creates a post comment
  addNewComment(postId: number, comment: Comment) {
    return this.httpClient.post<Comment>(API + '/posts' + postId + '/comments', comment);
  }

  createUser(params: User) {
    return this.httpClient.post<User>(API + '/users', params);
  }

  deleteUser(id: number) {
    return this.httpClient.delete<void>(API + /users/ + id);
  }
}
