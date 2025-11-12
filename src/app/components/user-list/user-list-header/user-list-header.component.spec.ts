import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListHeaderComponent } from './user-list-header.component';
import { Router, provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserListHeaderComponent', () => {
  let component: UserListHeaderComponent;
  let fixture: ComponentFixture<UserListHeaderComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [
        UserListHeaderComponent,
        BrowserAnimationsModule
      ],
      providers: [
        provideRouter([]),
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit grid columns when clicked', (done) => {
    component.gridCols.subscribe((cols: number) => {
      expect(cols).toBe(3);
      done();
    });

    component.onClickGridCols(3);
  });

  it('should emit new user event when clicked', (done) => {
    component.newUser.subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    component.onClickNewUser();
  });

  it('should emit input value when search changes', (done) => {
    component.inputValue.subscribe((value: string) => {
      expect(value).toBe('test');
      done();
    });

    component.onInputSearch('test');
  });

  it('should navigate to posts when seeAllPosts is called', async () => {
    await component.seeAllPosts();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['posts']);
  });

  it('should have toolbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
  });

  it('should have new user button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('app-custom-button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should have search component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-custom-search')).toBeTruthy();
  });

  it('should have grid menu', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button[mat-icon-button]')).toBeTruthy();
  });

  it('should have see all posts button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('app-custom-button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
