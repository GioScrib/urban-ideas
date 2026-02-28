import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';
import { AuthService } from '../../../core/services/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout', 'isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'], { url: '/users' });

    await TestBed.configureTestingModule({
      imports: [ToolbarComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout on AuthService when onLogout is called', () => {
    component.onLogout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should return true if on login page', () => {
    Object.defineProperty(router, 'url', { get: () => '/auth' });
    expect(component.isLoginPage()).toBe(true);
  });

  it('should return false if not on login page', () => {
    Object.defineProperty(router, 'url', { get: () => '/users' });
    expect(component.isLoginPage()).toBe(false);
  });
});
