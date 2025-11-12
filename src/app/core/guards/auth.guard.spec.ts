import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let mockRouter: jasmine.SpyObj<Router>;

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

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when token exists', () => {
    localStorage.setItem('auth_token', 'test-token');

    const result = guard.canActivate();

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should deny activation and navigate to /auth when token does not exist', () => {
    localStorage.removeItem('auth_token');

    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should deny activation when token is empty string', () => {
    localStorage.setItem('auth_token', '');

    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
