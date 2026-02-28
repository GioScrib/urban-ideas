import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let localStorageSpy: jasmine.SpyObj<Storage>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token and navigate to users on login if valid', () => {
    httpClientSpy.get.and.returnValue(of({}));
    service.login('test-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'test-token');
    expect(httpClientSpy.get).toHaveBeenCalledWith('https://gorest.co.in/public/v2/users', { params: { per_page: 1 } });
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should not navigate to users on login if invalid', () => {
    httpClientSpy.get.and.returnValue(throwError(() => new Error('401')));
    service.login('invalid-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'invalid-token');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not save empty token', () => {
    service.login('');
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should remove token and navigate to auth on logout', () => {
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should return true if authenticated', () => {
    localStorage.setItem('auth_token', 'test-token');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return false if not authenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return token if exists', () => {
    localStorage.setItem('auth_token', 'test-token');
    expect(service.getToken()).toBe('test-token');
  });

  it('should return null if token does not exist', () => {
    expect(service.getToken()).toBe(null);
  });
});
