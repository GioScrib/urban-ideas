import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpClient } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { Observable, of } from 'rxjs';

describe('authInterceptor', () => {
  let mockNext: jasmine.Spy<HttpHandlerFn>;

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

    mockNext = jasmine.createSpy('next').and.returnValue(of({} as HttpEvent<unknown>));

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', { get: of({}) }) }
      ]
    });
  });

  it('should add Authorization header when token exists', () => {
    localStorage.setItem('auth_token', 'test-token');

    const req = new HttpRequest('GET', '/api/test');

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, mockNext);
    });

    expect(mockNext).toHaveBeenCalled();
    const modifiedReq = mockNext.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(modifiedReq.headers.get('Authorization')).toBe('Bearer test-token');
  });

  it('should not add Authorization header when token does not exist', () => {
    localStorage.removeItem('auth_token');

    const req = new HttpRequest('GET', '/api/test');

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, mockNext);
    });

    expect(mockNext).toHaveBeenCalled();
    const modifiedReq = mockNext.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(modifiedReq.headers.has('Authorization')).toBe(false);
  });

  it('should pass through the request when no token', () => {
    localStorage.removeItem('auth_token');

    const req = new HttpRequest('GET', '/api/test');

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, mockNext);
    });

    expect(mockNext).toHaveBeenCalledWith(req);
  });

  it('should handle empty token as no token', () => {
    localStorage.setItem('auth_token', '');

    const req = new HttpRequest('GET', '/api/test');

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, mockNext);
    });

    const modifiedReq = mockNext.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(modifiedReq.headers.has('Authorization')).toBe(false);
  });
});
