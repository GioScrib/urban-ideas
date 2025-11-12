import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { User } from '../../shared/user';
import { Post } from '../../shared/post.model';
import { Comment } from '../../shared/comment.model';

const API = 'https://gorest.co.in/public/v2';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Mock localStorage
    let store: { [key: string]: string } = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('userList', () => {
    it('should fetch users list', () => {
      const mockUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'male', status: 'active' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', gender: 'female', status: 'active' }
      ];

      service.userList({}).subscribe(response => {
        expect(response.body).toEqual(mockUsers);
        expect(response.body?.length).toBe(2);
      });

      const req = httpMock.expectOne(`${API}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should fetch users with pagination params', () => {
      const mockUsers: User[] = [];
      const params = { page: 2, per_page: 20 };

      service.userList(params).subscribe();

      const req = httpMock.expectOne((request) => {
        return request.url === `${API}/users`;
      });
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe('getPostList', () => {
    it('should fetch posts list', () => {
      const mockPosts: Post[] = [
        { id: 1, user_id: 1, title: 'Test Post', body: 'Test Body' }
      ];

      service.getPostList({}).subscribe(response => {
        expect(response.body).toEqual(mockPosts);
      });

      const req = httpMock.expectOne(`${API}/posts`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);
    });

    it('should fetch posts with params', () => {
      const mockPosts: Post[] = [];
      const params = { page: 1, per_page: 10, name: 'test', email: 'test@example.com' };

      service.getPostList(params).subscribe();

      const req = httpMock.expectOne((request) => {
        return request.url === `${API}/posts` &&
          request.params.get('page') === '1' &&
          request.params.get('per_page') === '10';
      });
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);
    });
  });

  describe('getUser', () => {
    it('should fetch a single user', () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        gender: 'male',
        status: 'active'
      };

      service.getUser(1).subscribe(user => {
        expect(user).toEqual(mockUser);
        expect(user.id).toBe(1);
      });

      const req = httpMock.expectOne(`${API}/users/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });
  });

  describe('getUserPosts', () => {
    it('should fetch user posts', () => {
      const mockPosts: Post[] = [
        { id: 1, user_id: 1, title: 'Post 1', body: 'Body 1' },
        { id: 2, user_id: 1, title: 'Post 2', body: 'Body 2' }
      ];

      service.getUserPosts(1).subscribe(posts => {
        expect(posts).toEqual(mockPosts);
        expect(posts.length).toBe(2);
      });

      const req = httpMock.expectOne(`${API}/users/1/posts`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);
    });
  });

  describe('getCommentsForPost', () => {
    it('should fetch comments for a post', () => {
      const mockComments: Comment[] = [
        { id: 1, post_id: 1, name: 'Comment 1', email: 'user@example.com', body: 'Comment body' }
      ];

      service.getCommentsForPost(1).subscribe(comments => {
        expect(comments).toEqual(mockComments);
      });

      const req = httpMock.expectOne(`${API}/posts/1/comments`);
      expect(req.request.method).toBe('GET');
      req.flush(mockComments);
    });
  });

  describe('addNewComment', () => {
    it('should add a new comment', () => {
      const newComment: Comment = {
        id: 1,
        post_id: 1,
        name: 'New Comment',
        email: 'user@example.com',
        body: 'Comment body'
      };

      service.addNewComment(1, newComment).subscribe(comment => {
        expect(comment).toEqual(newComment);
      });

      const req = httpMock.expectOne(`${API}/posts/1/comments`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newComment);
      req.flush(newComment);
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const newUser: User = {
        id: 1,
        name: 'New User',
        email: 'newuser@example.com',
        gender: 'male',
        status: 'active'
      };

      service.createUser(newUser).subscribe(user => {
        expect(user).toEqual(newUser);
      });

      const req = httpMock.expectOne(`${API}/users`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newUser);
      req.flush(newUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', () => {
      service.deleteUser(1).subscribe();

      const req = httpMock.expectOne(`${API}/users/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('addUserPost', () => {
    it('should add a user post', () => {
      const newPost: Post = {
        id: 1,
        user_id: 1,
        title: 'New Post',
        body: 'Post body'
      };

      service.addUserPost(newPost).subscribe(post => {
        expect(post).toEqual(newPost);
      });

      const req = httpMock.expectOne(`${API}/users/1/posts`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newPost);
      req.flush(newPost);
    });
  });

  describe('User-Image mapping', () => {
    it('should add user id to image mapping', () => {
      service.addUserIdImgMapping(1, 'http://example.com/image.jpg');
      const img = service.getImgForUser(1);
      expect(img).toBe('http://example.com/image.jpg');
    });

    it('should return undefined for non-existent user', () => {
      const img = service.getImgForUser(999);
      expect(img).toBeUndefined();
    });

    it('should update existing mapping', () => {
      service.addUserIdImgMapping(1, 'http://example.com/old.jpg');
      service.addUserIdImgMapping(1, 'http://example.com/new.jpg');
      const img = service.getImgForUser(1);
      expect(img).toBe('http://example.com/new.jpg');
    });
  });
});
