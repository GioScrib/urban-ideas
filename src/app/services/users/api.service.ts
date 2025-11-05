import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../shared/user';
import {Post} from '../../shared/post.model';
import {Comment} from '../../shared/comment.model';

const API = "https://gorest.co.in/public/v2";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly httpClient: HttpClient;
  private readonly authToken: string | null;
  private readonly mapUsrIdImg: Map<number, string> = new Map();

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

    if (params['page']) {
      p.set('page', params['page']);
    }
    if (params['per_page']) {
      p.set('per_page', params['per_page']);
    }
    if (params['name']) {
      p.set('name', params['name']);
    }
    if (params['email']) {
      p.set('email', params['email']);
    }
    return this.httpClient.get<User[]>(API + '/users', {params: p, observe: 'response'});
  }

  getPostList(params: {
    page?: number,
    per_page?: number,
    name?: string,
    email?: string
  }) {
    let p = new HttpParams();

    if (params['page']) {
      /**
       * HttpParams.set() returns a new HttpParams instance and does not
       * mutate the original. The returned value must be assigned back to
       * 'p'.
       */
      p = p.set('page', params['page']);
    }
    if (params['per_page']) {
      p = p.set('per_page', params['per_page']);
    }
    if (params['name']) {
      p = p.set('name', params['name']);
    }
    if (params['email']) {
      p = p.set('email', params['email']);
    }
    return this.httpClient.get<Post[]>(API + '/posts', {params: p, observe: 'response'});
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
    return this.httpClient.post<Comment>(API + '/posts/' + postId + '/comments', comment);
  }

  createUser(params: User) {
    return this.httpClient.post<User>(API + '/users', params);
  }

  deleteUser(id: number) {
    return this.httpClient.delete<void>(API + /users/ + id);
  }

  addUserIdImgMapping(userId: number, img: string) {
    if (this.mapUsrIdImg.has(userId)) {
      this.mapUsrIdImg.delete(userId);
      console.log('ApiService says: deleted existing mapping for id: ' + userId);
    }
    this.mapUsrIdImg.set(userId, img);
    console.log('ApiService says: added new mapping', userId, img);
  }

  getImgForUser(id: number) {
    return this.mapUsrIdImg.get(id);
  }

// /public/v2/users/7583009/posts
  addUserPost(post: Post) {
    return this.httpClient.post<Post>(API + '/users/' + post.user_id + '/posts', post);
  }
}
