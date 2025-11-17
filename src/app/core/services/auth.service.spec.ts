import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

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

  it('should save token and navigate to users on login', () => {
    service.login('test-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'test-token');
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
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
